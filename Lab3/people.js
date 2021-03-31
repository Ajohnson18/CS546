const axios = require('axios');

async function getPeople(){
  const url = "https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json";
  const { data } = await axios.get(url);
  return data;
}

async function getPersonById(id) {
	if(typeof id != "number") throw "Error: Wrong parameter type.";
	if(id === undefined) throw "Error: No parameter defined.";

	const data = await getPeople();
	const firstId = data[0].id;
	const lastId = data[data.length - 1].id;

	if(id < firstId || id > lastId) throw "Error: ID out of bounds.";

	for(i = 0; i < data.length; i++) {
		if(data[i].id == id) return data[i];
	}

	return "Error: No person found";
}

async function howManyPerState(state) {
	if(typeof state != "string") throw "Error: Wrong parameter type.";
	if(state === undefined) throw "Error: No parameter defined.";

	const data = await getPeople();

	let count = 0;
	for(o of data) {
		if(o.address.state == state) count++;
	}

	if(count == 0) {
		throw "Error: No state found";
	} else {
		return count;
	}
}

async function personByAge(index) {
	if(typeof index != "number") throw "Error: Wrong parameter type.";
	if(index === undefined) throw "Error: No parameter defined.";

	const data = await getPeople();

	if(index < 0 || index >= data.length) throw "Error: index not within bounds";

	data.sort(function(a,b) {
		let dA = new Date(a.date_of_birth);
		let dB = new Date(b.date_of_birth);

		if(dA.getYear() < dB.getYear()) return -1;
		if(dA.getYear() > dB.getYear()) return 1;
		if(dA.getMonth() < dB.getMonth()) return -1;
		if(dA.getMonth() > dB.getMonth()) return 1;
		if(dA.getDay() < dB.getDay()) return -1;
		if(dA.getDay() > dB.getDay()) return 1;
		return 0;
	});

	let dd = new Date(data[index].date_of_birth);
	var diff_ms = Date.now() - dd.getTime();
    var age_dt = new Date(diff_ms); 
  
    let age = Math.abs(age_dt.getUTCFullYear() - 1970);

	return {first_name: data[index].first_name, last_name: data[index].last_name, date_of_birth: data[index].date_of_birth, age: age};
}

async function peopleMetrics() {
	let output = [];

	const data = await getPeople();
	let totalLetters = 0;
	let totalVowels = 0;
	let longestName = "";
	let shortestName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
	let mostRepeatingCity = 'A';
	let averageAge = 0;
	cityCounter = {};
	for(o of data) {
		totalLetters += o.first_name.length + o.last_name.length;
		for(c of (o.first_name + o.last_name)) {
			if(c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') totalVowels++;
		}
		if(o.first_name.length + o.last_name.length > longestName.length - 1) longestName = o.first_name + " " + o.last_name;
		if(o.first_name.length + o.last_name.length < shortestName.length - 1) shortestName = o.first_name + " " + o.last_name;

		if(o.address.city in cityCounter) cityCounter[o.address.city] += 1;
		else cityCounter[o.address.city] = 1;

		let dd = new Date(o.date_of_birth);
		var diff_ms = Date.now() - dd.getTime();
	    var age_dt = new Date(diff_ms); 
	  
	    let age = Math.abs(age_dt.getUTCFullYear() - 1970);
	    averageAge += age;

	}

	averageAge = averageAge / data.length;

	let cityArray = Object.entries(cityCounter);
	let mostCity = ['x', -1];
	for(c of cityArray) {
		if(c[1] > mostCity[1]) {
			mostCity[0] = c[0];
			mostCity[1] = c[1];
		}
	}

	mostRepeatingCity = mostCity[0];

	let obj = {};
	obj.totalLetters = totalLetters;
	obj.totalVowels = totalVowels;
	obj.totalConsonants = totalLetters - totalVowels;
	obj.longestName = longestName;
	obj.shortestName = shortestName;
	obj.mostRepeatingCity = mostRepeatingCity;
	obj.averageAge = averageAge;
	return obj;
}

module.exports = {
	getPeople,
	getPersonById,
	howManyPerState,
	personByAge,
	peopleMetrics
}