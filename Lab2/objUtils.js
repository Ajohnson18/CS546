function makeArrays(arr) {
	if(arr === undefined) throw "Error: No argument supplied.";
	if(typeof arr != 'object') throw "Error: Argument must be an array.";
	if(arr.length < 2) throw "Error: Array contains less than 2 elements.";

	for(i = 0; i < arr.length; i++) {
		if(typeof arr[i] != "object") throw "Error: array does not contain all objects.";
		if(Object.keys(arr[i]).length === 0 && arr[i].constructor === Object) throw "Error: object cannot be empty";
	}

	let output = [];
	for(i = 0; i < arr.length; i++) {
		let k = Object.entries(arr[i]);
		for(j = 0; j < k.length; j++) {
			output.push(k[j]);
		}
	}

	return output;
}

function isDeepEqual(obj1, obj2) {
	if(obj1 === undefined || obj2 === undefined) throw "Error: No argument supplied.";
	if(Object.values(obj1).length != Object.values(obj2).length) return false;

	let arrO = Object.entries(obj1);
	let arr1 = Object.entries(obj2);
	arrO = arrO.sort();
	arr1 = arr1.sort();
	for(i = 0; i < arrO.length; i++) {
		if(arrO[i][0] != arr1[i][0]) {
			return false;
		}
		if(typeof arrO[i][1] == "object" && typeof arr1 == "object") {
			let k = isDeepEqual(arrO[i][1], arr1[i][1]);
			if(k) continue;
			else return k;
		}
		if(arrO[i][1] !== arr1[i][1]) {
			return false;
		}
	}
	return true;
}

function computeObject(obj, func) {
	if(obj === undefined || func === undefined) throw "Error: No argument supplied.";
	if(typeof obj != 'object' || typeof func != "function") throw "Error: Argument must be an array.";

	let k = Object.entries(obj);
	let output = {};
	for(i = 0; i < k.length; i++) {
		output[k[i][0]] = func(k[i][1]);
	}

	return output;
}

module.exports = {
	makeArrays,
	isDeepEqual,
	computeObject
};