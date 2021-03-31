
const arraysMod = require('./arrayUtils');
const stringsMod = require('./stringUtils');
const obsMod = require('./objUtils');


try {
	const meanOne = arraysMod.mean([1, 2, 3]);
	console.log("mean passed successfully");
} catch (e) {
	console.log("mean failed a test case");
}

try {
	const meanTwo = arraysMod.mean(1234);
	console.log("mean passed successfully");
} catch (e) {
	console.log("mean failed a test case");
}

try {
	const medianOne = arraysMod.medianSquared([1, 2, 3]);
	console.log("medianSquared passed successfully");
} catch (e) {
	console.log("medianSquared failed a test case");
}

try {
	const medianTwo = arraysMod.medianSquared([]);
	console.log("medianSquared passed successfully");
} catch (e) {
	console.log("medianSquared failed a test case");
}

try {
	const maxOne = arraysMod.maxElement([1, 2, 3]);
	console.log("maxElement passed successfully");
} catch (e) {
	console.log("maxElement failed a test case");
}

try {
	const maxTwo = arraysMod.maxElement([]);
	console.log("maxElement passed successfully");
} catch (e) {
	console.log("maxElement failed a test case");
}

try {
	const fillOne = arraysMod.fill(5);
	console.log("fill passed successfully");
} catch (e) {
	console.log("fill failed a test case");
}

try {
	const fillTwo = arraysMod.fill();
	console.log("fill passed successfully");
} catch (e) {
	console.log("fill failed a test case");
}

try {
	const countRepeatingOne = arraysMod.countRepeating([1,1,"1",2,"2","apple", "apple"]);
	console.log("countRepeating successfully");
} catch (e) {
	console.log("countRepeating failed a test case");
}

try {
	const countRepeatingTwo = arraysMod.countRepeating(5);
	console.log("countRepeating passed successfully");
} catch (e) {
	console.log("countRepeating failed a test case");
}

try {
	const isEqualOne = arraysMod.isEqual([1,2,3, ["apple"]], [1,2,3, ["apple"]]);
	console.log("isEqual passed successfully");
} catch (e) {
	console.log("isEqual failed a test case");
}

	const camelCaseOne = stringsMod.camelCase("Apple is good Food");


try {
	const camelCaseOne = stringsMod.camelCase("Apple is good Food");
	console.log("camelCase passed successfully");
} catch (e) {
	console.log("camelCase failed a test case");
}

try {
	const camelCaseTwo = stringsMod.camelCase(["apple"]);
	console.log("camelCase passed successfully");
} catch (e) {
	console.log("camelCase failed a test case");
}

try {
	const replaceCharOne = stringsMod.replaceChar("Daddy");
	console.log("replaceChar passed successfully");
} catch (e) {
	console.log("replaceChar failed a test case");
}

try {
	const replaceCharTwo = stringsMod.replaceChar(["apple"]);
	console.log("replaceChar passed successfully");
} catch (e) {
	console.log("replaceChar failed a test case");
}	const mashUpOne = stringsMod.mashUp("Alex", "Johnson");


try {
	const mashUpOne = stringsMod.mashUp("Alex", "Johnson");
	console.log("mashUp passed successfully");
} catch (e) {
	console.log("mashUp failed a test case");
}

try {
	const mashUpOne = stringsMod.mashUp(["apple"]);
	console.log("mashUp passed successfully");
} catch (e) {
	console.log("mashUp failed a test case");
}

const first = { x: 2, y: 3};
const second = { a: 70, x: 4, z: 5 };
const third = { x: 0, y: 9, q: 10 };
const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

try {
	const makeArrayOne = obsMod.makeArrays([first, second, third]);
	console.log("makeArray passed successfully");
} catch (e) {
	console.log("makeArray failed a test case");
}

try {
	const makeArrayTwo = obsMod.makeArrays(["apple"]);
	console.log("makeArray passed successfully");
} catch (e) {
	console.log("makeArray failed a test case");
}

try {
	const isDeepOne = obsMod.isDeepEqual(fifth, forth);
	console.log("isDeepEqual passed successfully");
} catch (e) {
	console.log("isDeepEqual failed a test case");
}

try {
	const isDeepTwo = obsMod.isDeepEqual(["apple"]);
	console.log("isDeepEqual passed successfully");
} catch (e) {
	console.log("isDeepEqual failed a test case");
}

try {
	const computeOne = obsMod.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
	console.log("computeObject passed successfully");
} catch (e) {
	console.log("computeObject failed a test case");
}

try {
	const computeTwo = obsMod.computeObject(["apple"]);
	console.log("computeObject passed successfully");
} catch (e) {
	console.log("computeObject failed a test case");
}
