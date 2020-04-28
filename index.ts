//Importing
import * as express from 'express';
import * as fs from 'async-file';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';
import * as bodyParser from 'body-parser';

//Global variabels
const app = express();
const router = express.Router();
const PORT = 10010;

let config:CONFIG 

//types
/*interface INDEX extends Object {
    rows: Array<ROW>    
}*/

class CONFIG {
    config: CONF;
    constructor(json: CONF) {
        this.config = json
    }
}

interface CONF {
    rows: Array<ROW>;
}

interface ROW {
    page: string,
    items: Array<ITEM>
}
interface ITEM {
    textposition: "Top" | "Middle" | "Bottom",
    function: string,
    img: string,
    text: string,
    textcolor:"Dark" | "Light"
}

  
//express middleware
app.use('/ws',router)
app.use(express.static(__dirname + "/public"))
//app.use(helmet.frameguard());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    debug:false
}));


app.set("view engine",'hbs');
app.set('views',__dirname + "/views")



//express application
app.get('/',async (req,res) => { 
    await loadConfig();
    //let page = new Object(config);
    let p = req.query.p || "index";
    

    res.render('index', {rows:config.config.rows.filter(e => e.page == p)})
})

app.get('/configurator',async (req,res) => { 
    await loadConfig();
    res.render('configurator')
})

app.post('/configurator',async (req,res) => { 
    await loadConfig();
    res.render('configurator2',{rows:req.body.rows,cols:req.body.cols,name:req.body.name})
})

app.get('/reloadConfig',async (req,res) => {
    await loadConfig();
    res.json({status:"ok"})
})

app.post('/uploadFile',(req,res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let file:any = req.files.file

    let filej = JSON.parse(JSON.stringify(file));
    
    if(filej.name) {
        //One file
        file.mv("public/files/"+filej.name).then(() => {
            res.send('File uploaded!');
        }).catch(err => {
            return res.status(500).send(err);
        })
        
    } else {
        //Multiple Files
        for(let i = 0; i < file.length; i++) {
            file[i].mv("public/files/"+file[i].name).then(() => {
               console.log('File uploaded!');
            }).catch(err => {
                return res.status(500).send(err);
            })
        }
        res.send('File uploaded!');
    }

})
/*
app.get('/frames',(req,res) => {
    res.send("<iframe src=\"https://player.twitch.tv/?channel=pietsmiet\" frameborder=\"0\" allowfullscreen=\"true\" scrolling=\"no\" height=\"378\" width=\"620\"></iframe><a href=\"https://www.twitch.tv/pietsmiet?tt_content=text_link&tt_medium=live_embed\" style=\"padding:2px 0px 4px; display:block; width:345px; font-weight:normal; font-size:10px; text-decoration:underline;\">Live-Video von PietSmiet auf www.twitch.tv ansehen</a>")
})
*/
async function loadConfig() {
    let data = await fs.readFile('config.json','utf8')
    config = new CONFIG(JSON.parse(data));
}

//Websocket stuff
router.get('/',(req,res) => {
    res.json("Use some other url!")
})



//startup stuff
app.listen(PORT, () => console.log(`Server listening on Port ${PORT}! Open me http://127.0.0.1:${PORT}`))