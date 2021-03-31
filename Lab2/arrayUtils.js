function mean(arr) {
	if(arr === undefined) throw "Error: No argument supplied.";
	if(typeof arr != 'object') throw "Error: Argument must be an array.";
	if(arr.length === 0) throw "Error: Array contains no elements.";

	let total = 0;
	for(i = 0; i < arr.length; i++) {
		if(typeof arr[i] != 'number') throw "Error: Invalid argument.";
		total += arr[i];
	}

	return total / arr.length;
}

function medianSquared(arr) {
	if(arr === undefined) throw "Error: No argument supplied.";
	if(typeof arr != 'object') throw "Error: Argument must be an array.";
	if(arr.length === 0) throw "Error: Array contains no elements.";
	for(i = 0; i < arr.length; i++) {
		if(typeof arr[i] != 'number') throw "Error: Invalid argument.";
	}

	let mid = Math.floor(arr.length/2);
	let nums = arr.sort((a,b) => a - b);
	return Math.pow(arr.length % 2 !== 0 ? nums[mid] : (nums[mid-1] + nums[mid]) / 2, 2);
}

function maxElement(arr) {
	if(arr === undefined) throw "Error: No argument supplied.";
	if(typeof arr != 'object') throw "Error: Argument must be an array.";
	if(arr.length === 0) throw "Error: Array contains no elements.";

	let max = Number.MIN_VALUE;
	let index = -1;
	for(i = 0; i < arr.length; i++) {
		if(typeof arr[i] != 'number') throw "Error: Invalid argument.";
		if(arr[i] > max) {
			index = i;
			max = arr[i];
		}
	}

	let obj = {};
	obj[max] = index;
	return obj;
}

function fill(num, val) {
	if(num === undefined) throw "Error: No argument supplied";
	if(typeof num != "number") throw "Error: First argument must be an integer";
	if(num < 1) throw "Error: Number must be greater than 0";

	let output = []
	if(val === undefined) {
		for(i = 0; i < num; i++) {
			output.push(i);
		}
	} else {
		for(i = 0; i < num; i++) {
			output.push(val);
		}
	}

	return output;
}

function countRepeating(arr) {
	if(arr === undefined) throw "Error: No argument supplied.";
	if(typeof arr != 'object') throw "Error: Argument must be an array.";

	let obj1 = {}
	let obj2 = {}

	for(i = 0; i < arr.length; i++) {
		if (arr[i] in obj1) obj1[arr[i]] = obj1[arr[i]] + 1;
		else obj1[arr[i]] = 1;
	}

	const entries = Object.entries(obj1);
	for(const [key, val] of entries) {
		if (val > 1) obj2[key] = val;
	}

	return obj2
}

function isEqual(arr1, arr2) {
	if(arr1 === undefined || arr2 === undefined) throw "Error: No argument supplied.";
	if(typeof arr1 != 'object' || typeof arr2 != "object") throw "Error: Argument must be an array.";

	if(arr1.length != arr2.length) {
		return false;
	}

	arr1 = arr1.sort();
	arr2 = arr2.sort();

	for (var i = 0; i < arr1.length; ++i) {
		if(typeof arr1[i] == "object" || typeof arr2[i] == "object") {
			let a = isEqual(arr1[i], arr2[i]);
			if(!a) return a;
			else continue;
		}
    	if (arr1[i] !== arr2[i]) return false;
  	}

	return true;

}

module.exports = {
	mean,
	medianSquared,
	maxElement,
	fill,
	countRepeating,
	isEqual
};