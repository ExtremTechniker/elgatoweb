"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
//Importing
var express = require("express");
var fs = require("async-file");
var cors = require("cors");
var fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
//Global variabels
var app = express();
var router = express.Router();
var PORT = 10010;
var config;
//types
/*interface INDEX extends Object {
    rows: Array<ROW>
}*/
var CONFIG = /** @class */ (function () {
    function CONFIG(json) {
        this.config = json;
    }
    return CONFIG;
}());
//express middleware
app.use('/ws', router);
app.use(express.static(__dirname + "/public"));
//app.use(helmet.frameguard());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    debug: false
}));
app.set("view engine", 'hbs');
app.set('views', __dirname + "/views");
//express application
app.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var p;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadConfig()];
            case 1:
                _a.sent();
                p = req.query.p || "index";
                res.render('index', { rows: config.config.rows.filter(function (e) { return e.page == p; }) });
                return [2 /*return*/];
        }
    });
}); });
app.get('/configurator', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadConfig()];
            case 1:
                _a.sent();
                res.render('configurator');
                return [2 /*return*/];
        }
    });
}); });
app.post('/configurator', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadConfig()];
            case 1:
                _a.sent();
                res.render('configurator2', { rows: req.body.rows, cols: req.body.cols, name: req.body.name });
                return [2 /*return*/];
        }
    });
}); });
app.get('/reloadConfig', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadConfig()];
            case 1:
                _a.sent();
                res.json({ status: "ok" });
                return [2 /*return*/];
        }
    });
}); });
app.post('/uploadFile', function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    var file = req.files.file;
    var filej = JSON.parse(JSON.stringify(file));
    if (filej.name) {
        //One file
        file.mv("public/files/" + filej.name).then(function () {
            res.send('File uploaded!');
        })["catch"](function (err) {
            return res.status(500).send(err);
        });
    }
    else {
        //Multiple Files
        for (var i = 0; i < file.length; i++) {
            file[i].mv("public/files/" + file[i].name).then(function () {
                console.log('File uploaded!');
            })["catch"](function (err) {
                return res.status(500).send(err);
            });
        }
        res.send('File uploaded!');
    }
});
/*
app.get('/frames',(req,res) => {
    res.send("<iframe src=\"https://player.twitch.tv/?channel=pietsmiet\" frameborder=\"0\" allowfullscreen=\"true\" scrolling=\"no\" height=\"378\" width=\"620\"></iframe><a href=\"https://www.twitch.tv/pietsmiet?tt_content=text_link&tt_medium=live_embed\" style=\"padding:2px 0px 4px; display:block; width:345px; font-weight:normal; font-size:10px; text-decoration:underline;\">Live-Video von PietSmiet auf www.twitch.tv ansehen</a>")
})
*/
function loadConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile('config.json', 'utf8')];
                case 1:
                    data = _a.sent();
                    config = new CONFIG(JSON.parse(data));
                    return [2 /*return*/];
            }
        });
    });
}
//Websocket stuff
router.get('/', function (req, res) {
    res.json("Use some other url!");
});
//startup stuff
app.listen(PORT, function () { return console.log("Server listening on Port " + PORT + "! Open me http://127.0.0.1:" + PORT); });
