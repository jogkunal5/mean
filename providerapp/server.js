var express = require('express');
var app = express(); // using this we can use commands, function of express in this (server.js) file
var xlsx_to_json = require("xlsx-to-json");

// To test whether server is running correctly
/* app.get("/", function(req, res){
 res.send("Hello world from server.js");
 }); */

app.use(express.static(__dirname + "/public")); // express.static means we are telling the server to look for static file i.e. html,css,js etc.

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

var providerlist=require('./routes/providerlist');
var collectiondata=require('./routes/collectiondata');
var listcollections=require('./routes/listcollections');
var getcollectiondata=require('./routes/getcollectiondata');
var exports=require('./routes/exports');
var savedocument=require('./routes/savedocument');

app.use('/providerlist', providerlist);
app.use('/collectiondata', collectiondata);
app.use('/listcollections', listcollections);
app.use('/getcollectiondata', getcollectiondata);
app.use('/exports', exports);
app.use('/save', savedocument);

app.listen(1000);
console.log("Server running on port 1000");