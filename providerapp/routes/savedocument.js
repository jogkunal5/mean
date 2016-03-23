var express = require('express');
var app = express();
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('providerapp');
var bodyParser = require('body-parser');


router.use(bodyParser.json()); // To parse the body that we received from input

router.route('/:id').put(function (req, res) {
    
    var id = req.body.providerList._id;
    delete req.body.providerList._id;

    db.collection(req.body.collectionName).findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: req.body.providerList},
        new : true,
        upsert: true
    }, function (err, doc) {
        res.json(doc);
    });
    
});

module.exports = router;