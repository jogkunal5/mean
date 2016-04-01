var express = require('express');
var ntlm = require('express-ntlm');
var path = require('path');
var app = express(); // using this we can use commands, function of express in this (server.js) file
var mongojs = require('mongojs');
var db = mongojs('ideacorner'); // Means which mongodb database & collection we are going to use
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var http = require('http');
var superwisor = require('supervisor');
var url = require('url');

// To test whether server is running correctly
app.get("/", function (req, res) {
    //res.send("Hello world from server.js");
    //console.log("In / get");
    var dt_id = process.env['USERNAME'];
    //console.log("=====>" + dt_id);
    res.cookie('dt_id', dt_id);
    res.sendFile(__dirname + "/public/index.html");
});

app.use(express.static(__dirname + "/public")); // express.static means we are telling the server to look for static file i.e. html,css,js etc.

app.use(bodyParser.json()); // To parse the body that we received from input


//function getUserName(res) {
//    var dt_id = process.env['USERNAME'];
//    return res.cookie('dt_id', dt_id);
//}

//app.get('*', function (req, res) {
//    getUserName(res);
//    // res.send("Hello world from server.js");
//    res.sendFile(__dirname + "/public/index.html");
//});


var storage = multer.diskStorage({
    //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

app.use(multer({dest: './uploads/', storage: storage}).single('file'));

// listens for the POST request from the controller
app.post('/ideacorner', function (req, res) {
    req.body.dt_id = process.env['USERNAME'];
    req.body.user_domain = process.env['USERDOMAIN'];
    req.body.computer_name = process.env['COMPUTERNAME'];
    req.body.logon_server = process.env['LOGONSERVER'];
    req.body.status = "Submitted";
    req.body.posted_on = getCurrentDate();
    req.body.file = req.file;
    db.collection('ideacorner').insert(req.body, function (err, doc) {
        res.json(doc);
    });
});

function getCurrentDate() {
    Date.prototype.yyyymmdd = function () {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
        var dd = this.getDate().toString();
        return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
    };
    d = new Date();
    return d.yyyymmdd();
}

//This tells the server to listen for the get request for created contactlist throughout
app.get('/ideacorner', function (req, res) {
    
    db.collection('ideacorner').find(function (err, docs) {
        res.json(docs);
    });
});

app.get('/get_users', function (req, res) {
    db.collection('user').find(function (err, docs) {
        res.json(docs);
    });
});

app.get('/get_theme_names', function (req, res) {
    db.collection('themes').find({}, {'_id': true, 'theme_name': true}, function (err, docs) {
        res.json(docs);
    });
});

app.get('/get_by_data', function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log("======================================================");
    console.log(query);
    db.collection('ideacorner').find(query, function (err, docs) {
        res.json(docs);
    });
});

app.delete('/ideacorner/:id', function (req, res) {
    var id = req.params.id; // to get the value of id from url
    db.collection('ideacorner').remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.get('/ideacorner/:id', function (req, res) {
    var id = req.params.id;
    db.collection('ideacorner').findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
    });
});

app.put('/ideacorner/:id', function (req, res) {

    delete req.body.ideacorner._id;
    req.body.ideacorner.reviewed_by = process.env['USERNAME'];
    req.body.ideacorner.reviewed_on = getCurrentDate();

    db.collection('ideacorner').findAndModify({
        query: {_id: mongojs.ObjectId(req.params.id)},
        update: {$set: req.body.ideacorner},
        new : true,
        upsert: true
    }, function (err, doc) {
        if (!err)
            res.json(doc);
        else
            console.log(err);
    });
});

app.get('/themes', function (req, res) {
    db.collection('themes').find().sort({_id: -1}, function (err, docs) {
        // docs is now a sorted array 
        res.json(docs);
    });
});

app.post('/themes', function (req, res) {
    db.collection('themes').insert(req.body.param, function (err, doc) {
        res.json(doc);
    });
});

app.get('/download/:id', function (req, res) {
    var id = req.params.id;
    db.collection('ideacorner').findOne({
        _id: mongojs.ObjectId(id)
    }, function (err, doc) {
        var path = doc.file['destination'] + "" + doc.file['filename'];
        res.download(path, function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
});


app.listen(2000);
console.log("Server running on port 2000");