var express = require('express');
var app = express();
var router=express.Router();
var mongojs = require('mongojs');
var db = mongojs('providerapp');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // To parse the body that we received from input

/*************************************************************************************
 *@Route: "/listcollections"
 *@Methods: .get
 *************************************************************************************/

router.route('/').get(function (req, res) {    
    db.listCollections(function (err, collections) {        
        res.json(collections);
    });
});

module.exports=router;