var express = require('express');
var app = express();
var router=express.Router();
var mongojs = require('mongojs');
var db = mongojs('providerapp');
var ntlm = require('express-ntlm');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var excel = require('exceljs');
var fs = require("fs");
var xlsx_to_json = require("xlsx-to-json");
var xls_to_json = require("xls-to-json");
var GenerateSchema = require('generate-schema');
var json2xls = require('json2xls');
var http = require('http');
var conform = require('conform');
var mongoose = require('mongoose');
var url=require('url');

app.use(bodyParser.json()); // To parse the body that we received from input
app.use(json2xls.middleware);

/*************************************************************************************
 *@Route: "/collectiondata/:id/collectionName/:collectionName"
 *@Methods: .get
 *************************************************************************************/

router.route('/:id/collectionName/:collectionName')
    .get(function (req, res) {
        console.log("kkkkkkkkkkkkkkkkk");
        var id = req.params.id;    
        //console.log(id+"=="+req.params.collectionName);
        db.collection(req.params.collectionName).findOne({
            _id: mongojs.ObjectId(id)
        }, function (err, doc) {
            res.json(doc);
        });
    });


module.exports=router;