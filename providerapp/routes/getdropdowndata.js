var express = require('express');
var app = express();
var router=express.Router();
var mongojs = require('mongojs');
var db = mongojs('providerapp');
var url=require('url');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // To parse the body that we received from input

/*************************************************************************************
 *@Route: "/getcollectiondata"
 *@Methods: .get
 *************************************************************************************/
router.route('/').get(function (req, res) {    
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    
    db.collection(query.colName).aggregate([{
        "$group":{
            "_id":"$"+query.query
            }
        }],function (err, docs) {        
        res.json(docs);
    });
    
});

module.exports=router;