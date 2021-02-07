var formidable = require('formidable');
var express = require("express");
var app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/pics/relaxing.gif', function(req, res) {
	const numImages = 4;
	var num = Math.floor(Math.random()*numImages)+1;
    res.sendFile(__dirname + '/pics/relaxing_' + num + '.gif');
});

app.post('/sendSound', function(req, res) {

	var submissionInfo = {};

	var form = new formidable.IncomingForm();

	form.parse(req);

	form.on('error', (err) => {
		console.log("Form error");
		res.writeHeader(400, {"Content-Type": "text/html"});
		res.write("<!DOCTYPE html>Something went wrong when processing your form submission. Please check the following and try again.");
		res.end();
		return;
	});

	form.on('field', (fieldName, fieldValue) => {
		submissionInfo[fieldName] = fieldValue;
	});

	form.on('end', function (name, file) {
		console.log("Submission: ", submissionInfo);
	});

});

app.use(express.static('.'));

var PORT = 3000;
app.listen(PORT, function() {
    console.log("Listening on port " + PORT);
});