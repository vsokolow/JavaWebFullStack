"use strict";
const getLength = (str) => str.length;
const testFunc = (num, str) => `Строка: ${str}, Число: ${num}`;
console.log(testFunc(200, 'hello, world!'));
// console.log(testFunc('hi', 5)); Argument of type 'string' is not assignable to parameter of type 'number'
// console.log(getLength(6)); Argument of type 'number' is not assignable to parameter of type 'string'
console.log(getLength('hello'));
