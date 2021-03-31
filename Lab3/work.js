const axios = require('axios');

async function getPeople(){
  const url = "https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json";
  const { data } = await axios.get(url);
  return data;
}

async function getWork(){
  const url = "https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json";
  const { data } = await axios.get(url);
  return data;
}

async function listEmployees() {
	const people = await getPeople();
	const jobs = await getWork();

	let output = [];
	for(o of jobs) {
		let obj = {}
		obj['company_name'] = o.company_name;
		let peepsArr = o.employees;
		for(i = 0; i < peepsArr.length; i++) {
			for(j of people) {
				if(j.id == peepsArr[i]) {
					peepsArr[i] = {first_name: j.first_name, last_name: j.last_name};

				}
			}
		}
		obj['employees'] = peepsArr;
		output.push(obj);
	}

	return output;

}

async function fourOneOne(pN) {
	if(typeof pN != "string") throw "Error: Wrong parameter type.";
	if(pN === undefined) throw "Error: No parameter defined.";
	for(i = 0; i < pN.length; i++) {
		if(i == 3 || i == 7) {
			if(pN[i] != '-') throw "Error: Not a valid phone number.";
		} else {
			if (!(pN[i] >= '0' && pN[i] <= '9')) throw "Error: Not a valid phone number.";
		}
	}

	const jobs = await getWork();

	for(o of jobs) {
		if(o.company_phone == pN) {
			return {company_name: o.company_name, company_address: o.company_address};
		}
	}

	throw "Error: No company found.";
	return;
}

async function whereDoTheyWork(ssn) {
	if(typeof ssn != "string") throw "Error: Wrong parameter type.";
	if(ssn === undefined) throw "Error: No parameter defined.";

	for(i = 0; i < ssn.length; i++) {
		if(i == 3 || i == 6) {
			if(ssn[i] != '-') throw "Error: Not a valid ssn.";
		} else {
			if (!(ssn[i] >= '0' && ssn[i] <= '9')) throw "Error: Not a valid ssn.";
		}
	}

	const people = await getPeople();
	const jobs = await getWork();

	let pId = -1;
	let name = "s";
	for(o of people) {
		if(o.ssn == ssn) {
			pId = o.id;
			name = o.first_name + " " + o.last_name;
			break;
		} 
	}

	if(pId == -1) throw "Error: Person not found.";

	for(o of jobs) {
		for(i of o.employees) {
			if(i == pId) return name + " works at " + o.company_name;
		}
	}

	throw "Error: No company found with that employee";
	return;


}

module.exports = {
	listEmployees,
	fourOneOne,
	whereDoTheyWork
}