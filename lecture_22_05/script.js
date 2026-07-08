// 1. Написать функцию getSum, которая принимает 2 числа в качестве аргументов и возвращает их сумму


function getSum(num1, num2) {
    return num1 + num2
}

// const getSum_ = (num1, num2) => num1 + num2;

console.log(getSum(30, 65)); //95
// console.log(getSum_(30, 65)); //95
console.log(getSum(30)); //MaN
console.log(getSum(30, 30, 30, 30)); //60, берет только первые два аргумента

const getSum_ = (num1, num2, ...args) => {
    console.log(args)
    return num1 + num2
}

console.log(getSum_(30, 30, 100, 80));
console.log(getSum_(30, 30, null, 80));
console.log(getSum_(30, 30, 'qwerty', 80));



// 2. Есть объект user, вывести в консоль значение под ключом 'firstName'

const user = { 
    firstName: 'Oleg',
    lastName: 'Petrov',
    age: 30
}

let secretWord = 'age';

console.log(user); //{}
console.log(user.firstName); // 'Oleg'
console.log(user[secretWord]); // 30

console.log(Object.keys(user)); //['firstName', 'lastName', 'age']
console.log(Object.values(user)); //['Oleg', 'Petrov', 30]
console.log(Object.entries(user)); //['firstName', 'Oleg'], ['lastName', 'Petrov'], ['age', 30]

// Деструктуризация (процесс раскладывания объекта на переменные, используется очень часто, позволяет сократить код)

const {firstName, lastName} = user;
console.log(firstName); //'Oleg'
console.log(lastName); //'Petrov'
// console.log(age); //age is not defined

// Спредоператор ... - разбирает массив на элементы

const names = ['nelli', 'oleg', 'anna'];

console.log(names); // массив
console.log(...names); //три строки
console.log(names); //три строки


// ПРАКТИКА 26.05

console.log('ПРАКТИКА 26.05');

// 1. Реализовать функцию, которая принимает массив чисел и возвразает новый массив с новыми числами, умноженными на 2
// пример: [1, 2, 3] => [2, 4, 6]

const incrNumbers = arr => {
    const newArr =[];
    for(let i = 0; i < arr.length; i++) {
        newArr.push(arr[i] * 2)
    }

    // arr.array.forEach(element => newArr.push(element * 2));

    return newArr
}

console.log(incrNumbers([11, 27, 36]));

// 2. Реализовать функцию, которая принимает массив чисел и возвращает новый массив с положительными числами

const getPositiveNums = arr => {
    const newArr = [];

    arr.forEach(el => {
        if(el > 0) {
            newArr.push(el)
        }
    });
    return newArr
}

console.log(getPositiveNums([10, -8, 9, 0, -100]));

