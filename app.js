var express = require("express");
var bodyParser = require("body-parser");
var seedDB = require("./seed");
var mysql = require("mysql");
var helpers = require("./helpers");

var db = require("./models/db");
db.createConnection();
connection = db.getConnection();
seedDB(connection, "Colleges");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response) {
	connection.query("SELECT * FROM Colleges", function(error, rows) {
		response.render("welcome", {rows:rows});
	});
});

app.get("/search", function(request, response) {
	connection.query("SELECT * FROM Colleges WHERE name LIKE '%" + request.query.q + "%'", function(err, rows) {
		response.render("welcome", {rows:rows});
	});
});

app.get("/:id/show", function(request, response) {
	connection.query("SELECT * FROM Colleges WHERE id LIKE '" + request.params.id + "'", function(err, rows) {
		response.render("show", {location:rows[0]});
	});
});

app.listen(80, function() {
	console.log("Listening on port 80...");
});
