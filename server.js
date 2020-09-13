var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var convertisseur = require('./ConvMP4.js').Dl;
var app = express();

var conv = new convertisseur();

app.use(bodyParser.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res){
	res.render('index.hbs');
});

app.post('/', function(req, res){
	name = req.body.inputnamesong;
	conv.download(name);
	res.redirect('/');
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});