var bodyParser = require('body-parser');
var express = require('express');
var faker = require('faker');
var mysql = require('mysql');

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'alican',
	database: 'join_us'
});

app.listen(8080, function () {
	console.log('App started on port 8080.');
});

app.get("/", function (request, response) {
	var q = "SELECT COUNT(*) as count FROM users";

	connection.query(q, function (error, result) {
		if (error) throw error;

		var count = result[0].count;

		response.render('home', { data: count });
	});
});

app.post("/register", function (request, response) {
	var newUser = {
		email: request.body.email
	};

	var q = "INSERT INTO users SET ?";

	connection.query(q, newUser, function (error, result) {
		if (error) throw error;

		response.redirect('/');
	});
});



