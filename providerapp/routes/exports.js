var express = require('express');
var app = express();
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('providerapp');
var fs = require("fs");
var json2xls = require('json2xls');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // To parse the body that we received from input
router.use(json2xls.middleware);

/*************************************************************************************
 *@Route: "/export/:id"
 *@Methods: .put
 *************************************************************************************/

router.route('/:id').put(function (req, res) {
    console.log("==>In Exports");

    var id = req.body.providerList._id;
    delete req.body.providerList._id;

    db.collection(req.body.collectionName).findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: req.body.providerList},
        new : true,
        upsert: true
    }, function (err, doc) {
        exportToSpreadsheet(doc, res);
    });
});

function exportToSpreadsheet(doc, res) {
    var jsonArr = {};
    var jsonArr = doc;
    var xls = json2xls(jsonArr);
    fs.writeFileSync('data.xlsx', xls, 'binary');

    res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
    res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    res.xls('data.xlsx', jsonArr);
}

module.exports = router;