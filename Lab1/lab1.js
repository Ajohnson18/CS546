// Alex Johnson
// I pledge my honor that I have abided by the Stevens Honor System.

const isPrime = function isPrime(num) {
    if(num === 1) return false;
    for(let i = 2; i < num; i++) {
        if(num % i === 0) return false;
    }
    return true;
}

const questionOne = function questionOne(arr) {
    let result = {};
    if(!arr || arr.length === 0) return result;
    arr.forEach(x => (result[x] = isPrime(x)));
    return result; 
}

const questionTwo = function questionTwo(arr) { 
    if(!arr || arr.length === 0) return 0;
    let output = 0;
    arr.forEach(num => (output += (num * num)));
    output = Math.pow(output, 6);
    output = Math.sqrt(output);
    return output;
}

const questionThree = function questionThree(text) {
    let result = {
        consonants: 0,
        vowels: 0,
        numbers: 0,
        spaces: 0,
        punctuation: 0,
        specialCharacters: 0
    };
    for(let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        if((code > 64 && code < 90) || (code > 96 && code < 123)) {
            if(code === 65 || code === 69 || code === 73 || code === 79 || code === 85 || code === 97 || code === 101 || code === 105 || code === 111 || code === 117) {
                result.vowels = result.vowels + 1;
            } else {
                result.consonants = result.consonants + 1;
            }
        } else if(code > 47 && code < 58) {
            result.numbers = result.numbers + 1;
        } else if(code === 32) {
            result.spaces = result.spaces + 1;
        } else if(code === 33 || code === 34 || code === 39 || code === 40 || code == 41 || code == 44 || code == 45 || code == 46 || code === 58 || code === 59 || code == 63 || code === 91 || code === 93 || code === 123 || code === 125) {
            result.punctuation = result.punctuation + 1;
        } else {
            result.specialCharacters = result.specialCharacters + 1;
        }
    }
    return result;
}

const questionFour = function questionFour(num1, num2,num3) {
    const L = num1;
    const c = (num2 / 100) / 12;
    const n = num3 * 12;
    return (L * (c * Math.pow(1 + c, n)) / (Math.pow(1+c, n) - 1)).toFixed(2);
}

module.exports = {
    firstName: "Alex", 
    lastName: "Johnson", 
    studentId: "10439617",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};