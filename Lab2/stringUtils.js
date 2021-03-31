function camelCase(s) {
	if(s === undefined) throw "Error: String does not exist";
	if(s.length <= 0) throw "Error: String is of length 0";
	if(typeof s != "string") throw "Error: Argument must be of type string";

	let output = "";
	let tog = true;
	for(let c of s) {
		if(c == ' ') tog = false;
		else if(tog) output += (c.toLowerCase());
		else {
			output += (c.toUpperCase());
			tog = true;
		}
	}	
	return output;
}

function replaceChar(s) {
	if(s === undefined) throw "Error: String does not exist";
	if(s.length <= 0) throw "Error: String is of length 0";
	if(typeof s != "string") throw "Error: Argument must be of type string";

	let first = '';
	let tog = true;
	let output = "";
	for(i = 0; i < s.length; i++) {
		if(i == 0) {
			first = s[i];
			output += s[i];
			continue;
		}

		if(s[i].toLowerCase() == first.toLowerCase()) {
			output += (tog ? '*' : '$');
			tog = !tog;
			continue;
		}

		output += s[i];
	}

	return output;
}

function mashUp(s1, s2) {
	if(s1 === undefined || s2 === undefined) throw "Error: String does not exist";
	if(s1.length < 2 || s2.length < 2) throw "Error: String is of length less than 2";
	if(typeof s1 != "string" || typeof s2 != "string") throw "Error: Arguments must be of type string";

	let c1 = s1[0];
	let c2 = s2[0];
	ss1 = "";
	ss2 = "";
	ss1 += c2;
	ss2 += c1;

	ss1 += s1.substring(1);
	ss2 += s2.substring(1);

	return ss1 + " " + ss2;
}

module.exports = {
	camelCase,
	replaceChar,
	mashUp
};