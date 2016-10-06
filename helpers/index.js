var helpers = {};

// Server side

var states = {
	AL: "Alabama-1",
	AK: "Alaska-2",
	AZ: "Arizona-4",
	AR: "Arkansas-5",
	CA: "California-6",
	CO: "Colorado-8",
	CT: "Connecticut-9",
	DE: "Delaware-10",
	DC: "District of Columbia-11",
	FL: "Florida-12",
	GA: "Georgia-13",
	HI: "Hawaii-15",
	ID: "Idaho-16",
	IL: "Illnois-17",
	IN: "Indiana-18",
	IA: "Iowa-19",
	KS: "Kansas-20",
	KY: "Kentucky-21",
	LA: "Louisiana-22",
	ME: "Maine-23",
	MD: "Maryland-24",
	MA: "Massachussetts-25",
	MI: "Michigan-26",
	MN: "Minnesota-27",
	MS: "Mississippi-28",
	MO: "Missouri-29",
	MT: "Montana-30",
	NE: "Nebraska-31",
	NV: "Nevada-32",
	NH: "New Hampshire-33",
	NJ: "New Jersey-34",
	NM: "New Mexico-35",
	NY: "New York-36",
	NC: "North Carolina-37",
	ND: "North Dakota-38",
	OH: "Ohio-39",
	OK: "Oklahoma-40",
	OR: "Oregon-41",
	PA: "Pennsylvania-42",
	RI: "Rhode Island-44",
	SC: "South Carolina-45",
	SD: "South Dakota-46",
	TN: "Tennesee-47",
	TX: "Texas-48",
	UT: "Utah-49",
	VT: "Vermont-50",
	VA: "Virginia-51",
	WA: "Washington-53",
	WV: "West Virginia-54",
	WI: "Wisconsin-55",
	WY: "Wyoming-56"
};

helpers.expandStateName = function(stateLetters) {
	var expandedState = states[stateLetters];
	if (expandedState !== undefined) {
		return expandedState.split("-")[0];
	} else {
		return stateLetters;
	}
}

helpers.logQuery = function(query) {
	console.log(query);
	return query;
}

helpers.escapeSQLString = function(string) {
	var fixed_string = string.split("'").join("''");
	fixed_string = fixed_string.split("\\").join("\\\\");
	//console.log("PRE FIX: " + string);
	//console.log("POST FIX: " + fixed_string);
	return fixed_string;
};

module.exports = helpers;
