//Importing
import * as express from 'express';

//Global variabels
const app = express();
const router = express.Router();
const PORT = 10010;

//types
interface INDEX {
    rows: Array<ROW>
}
interface ROW {
    items: Array<ITEM>
}
interface ITEM {
    textposition: "Top" | "Middle" | "Bottom",
    functionName: string,
    img: string,
    text: string,
    textcolor:"Dark" | "Light"
}

//express application
app.get('/',(req,res) => {
    let data:INDEX = {
        rows:[
            {
                items: [
                    {
                        textposition:"Bottom",
                        functionName:"null",
                        img:"pg1.jpg",
                        text:"Hello world",
                        textcolor:"Dark"

                    },
                    {
                        textposition:"Bottom",
                        functionName:"null",
                        img:"pg1.jpg",
                        text:"Hello world",
                        textcolor:"Dark"
                    },
                    {
                        textposition:"Bottom",
                        functionName:"null",
                        img:"pg1.jpg",
                        text:"Hello world",
                        textcolor:"Dark"
                    }
                ]
            },
            {
                items: [
                    {
                        textposition:"Bottom",
                        functionName:"null",
                        img:"pg1.jpg",
                        text:"Hello world",
                        textcolor:"Dark"
                    },
                    {
                        textposition:"Bottom",
                        functionName:"null",
                        img:"pg1.jpg",
                        text:"Hello world",
                        textcolor:"Dark"
                    },
                    {
                        textposition:"Bottom",
                        functionName:"null",
                        img:"pg1.jpg",
                        text:"Hello world",
                        textcolor:"Dark"
                    }
                ]
            }
        ]
    }
    res.render('index',data)
})

//Websocket stuff
router.get('/',(req,res) => {
    res.json("Use some other url!")
})



//startup stuff
app.use('/ws',router)
app.use(express.static(__dirname + "/public"))
app.set("view engine",'hbs');
app.set('views',__dirname + "/views")

app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`))