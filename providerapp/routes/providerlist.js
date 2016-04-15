var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var db = mongojs('providerapp');
var multer = require('multer');
var xlsx_to_json = require("xlsx-to-json");
var xls_to_json = require("xls-to-json");
var json2xls = require('json2xls');
var XLSX = require('xlsx');
var path = require('path');


var storage = multer.diskStorage({//multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

router.use(multer({dest: './uploads/', storage: storage}).single('file'));
router.use(bodyParser.json()); // To parse the body that we received from input

/*************************************************************************************
 *@Route: "/providerlist"
 *@Methods: .get, .post
 *************************************************************************************/

router.route('/')
        .post(function (req, res) { // listens for the POST request from the controller
            //console.log("===========" + req.file.path);

            var workbook = XLSX.readFile(req.file.path);
            //console.log(workbook);
            var result = {};
            workbook.SheetNames.forEach(function (sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result = roa;
                }
            });

            var collectionName = req.body.title.toLowerCase().replace(/ /g, '_');
            db.collection(collectionName).insert(result, function (err, doc) {
            });

            req.body.dt_id = process.env['USERNAME'];
            req.body.user_domain = process.env['USERDOMAIN'];
            req.body.computer_name = process.env['COMPUTERNAME'];
            req.body.logon_server = process.env['LOGONSERVER'];
            db.collection('providerlist').insert(req.body, function (err, doc) {
                //console.log(err);
                res.json(doc);
            });
        })

        .get(function (req, res) { //This tells the server to listen for the get request for created providerlist throughout
            db.collection('providerlist').find(function (err, docs) {
                //console.log(docs);
                res.json(docs);
            });
        });


/*************************************************************************************
 *@Route: "/providerlist/:id"
 *@Methods: .get, .put, .delete
 *************************************************************************************/

router.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            db.collection('provider').findOne({_id: mongojs.ObjectId(id)}, function (err, data) {
                res.json(data);
            });
        })
        .put(function (req, res) {
            var id = req.params.id;
            db.collection('providerlist').findAndModify({
                query: {_id: mongojs.ObjectId(id)},
                update: {$set: {
                        title: req.body.title,
                        description: req.body.description
                    }}, new : true}, function (err, doc) {
                res.json(doc);
            });
        })
        .delete(function (req, res) {
            var id = req.params.id; // to get the value of id from url
            db.collection('providerlist').remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
                res.json(doc);
            });
        });


module.exports = router;