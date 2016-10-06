var mysql	= require("mysql");
var GoogleSpreadsheet = require("google-spreadsheet");
var fs		= require("fs");
var helpers = require("./helpers");

function seedDB(connection, db) {
	console.log("Loading database...");
	var doc = new GoogleSpreadsheet("1aXecbIE4DNTgEJqmHVmIT144JR5TBOn_6JFKGghdtHk");
	var creds = require("./key.json");
	var cells;

	doc.useServiceAccountAuth(creds, function() {
		doc.getInfo(function(err, info) {
			var sheet = info.worksheets[0];
			sheet.getCells({
				'min-row': 2,
				'max-row': 310,
				'min-col': 1,
				'max-col': 31,
				'return-empty': true
			}, function(err, cells) {
				if (db == "Colleges") {
					connection.query("SHOW TABLES LIKE 'Colleges'", function(error, rows, fields) {
						
						if (rows[0] != null) {
							connection.query("DROP TABLE Colleges");
						}
		
						// create table
						connection.query("CREATE TABLE Colleges ( ID int NOT NULL AUTO_INCREMENT, NAME varchar(256), COUNTRY varchar(15), STATE varchar(16), CITY varchar(32), RESERVATION_SITE varchar(64), FACILITY_NAME varchar(64), NUM_ROOMS varchar(32), RESERVATION_NUM varchar(128), RESERVATION_EMAIL varchar(64), RESERVATION_FAX varchar(32), CAMPUS_POLICE_NUM varchar(32), DAILY_RATE varchar(256), WEEKLY_RATE varchar(256), MONTHLY_RATE varchar(256), CHECK_IN varchar(32), CHECK_OUT varchar(32), ACCOMMODATIONS varchar(512), AMENITIES varchar(512), ACTIVITIES varchar(512), PARKING varchar(128), DINING varchar(64), DATES_AVAILABLE varchar(64), CREDIT_CARDS varchar(64), REQUIREMENTS varchar(64), MAILING_ADDRESS varchar(64), STREET_ADDRESS varchar(64), POC_INFO varchar(128), PICTURES varchar(128), TYPE varchar(64), DIRECTIONS varchar(512), APP_PAGE varchar(128), SEARCH_FIELD varchar(2048), PRIMARY KEY(ID) )", function(error) {
							// insert new data
							for (var x = 0; x < cells.length / 31; x++) {
								var string = "INSERT INTO Colleges (NAME, COUNTRY, STATE, CITY, RESERVATION_SITE, FACILITY_NAME, NUM_ROOMS, RESERVATION_NUM, RESERVATION_EMAIL, RESERVATION_FAX, CAMPUS_POLICE_NUM, DAILY_RATE, WEEKLY_RATE, MONTHLY_RATE, CHECK_IN, CHECK_OUT, ACCOMMODATIONS, AMENITIES, ACTIVITIES, PARKING, DINING, DATES_AVAILABLE, CREDIT_CARDS, REQUIREMENTS, MAILING_ADDRESS, STREET_ADDRESS, POC_INFO, PICTURES, TYPE, DIRECTIONS, APP_PAGE, SEARCH_FIELD) VALUES (";
								var search_string = "";
								for (var y = 0; y < 31; y++) {
									
									var data_entry = helpers.expandStateName(cells[x * 31 + y].value);
									
									if (y < 30) {
										if (y == 2) {
											string = string + "'" + helpers.escapeSQLString(data_entry) + "', ";
										} else {
											string = string + "'" + helpers.escapeSQLString(cells[x * 31 + y].value) + "', ";
										}
									}
									
									search_string = search_string + data_entry + " ";
									
									if (y == 30){
										string = string + "'" + helpers.escapeSQLString(cells[x * 31 + y].value) + "', '" + search_string + "')";
									}
								}
								
								connection.query(string, function(error, rows, fields) {
									
								});
							}
						});
					});
				}
			});
			console.log("Finished loading database.");
		});
	});
}

module.exports = seedDB;
