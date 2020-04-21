"use strict";
exports.__esModule = true;
//Importing
var express = require("express");
//Global variabels
var app = express();
var router = express.Router();
var PORT = 10010;
//express application
app.get('/', function (req, res) {
    var data = {
        rows: [
            {
                items: [
                    {
                        textposition: "Bottom",
                        functionName: "null",
                        img: "pg1.jpg",
                        text: "Hello world",
                        textcolor: "Dark"
                    },
                    {
                        textposition: "Bottom",
                        functionName: "null",
                        img: "pg1.jpg",
                        text: "Hello world",
                        textcolor: "Dark"
                    },
                    {
                        textposition: "Bottom",
                        functionName: "null",
                        img: "pg1.jpg",
                        text: "Hello world",
                        textcolor: "Dark"
                    }
                ]
            },
            {
                items: [
                    {
                        textposition: "Bottom",
                        functionName: "null",
                        img: "pg1.jpg",
                        text: "Hello world",
                        textcolor: "Dark"
                    },
                    {
                        textposition: "Bottom",
                        functionName: "null",
                        img: "pg1.jpg",
                        text: "Hello world",
                        textcolor: "Dark"
                    },
                    {
                        textposition: "Bottom",
                        functionName: "null",
                        img: "pg1.jpg",
                        text: "Hello world",
                        textcolor: "Dark"
                    }
                ]
            }
        ]
    };
    res.render('index', data);
});
//Websocket stuff
router.get('/', function (req, res) {
    res.json("Use some other url!");
});
//startup stuff
app.use('/ws', router);
app.use(express.static(__dirname + "/public"));
app.set("view engine", 'hbs');
app.set('views', __dirname + "/views");
app.listen(PORT, function () { return console.log("Server listening on Port " + PORT); });
