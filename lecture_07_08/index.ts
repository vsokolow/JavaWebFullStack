export {}; 

let a = 10;
a = 4;

let numbers = [1, 2, 3, 4, 5];// number[]
let strings = ['hi', 'hello'];// string[]
let mixArray = [1, 2, 3, 'hello'];// (string | number)[] - важны скобки!!!

mixArray.push('hello');

let array: number[] = [];// let array = []; НЕЛЬЗЯ!!! данные имеют тип any

// 1. Функция принимает массив с числами и возвращает массив с положительными числами

const getPositiveNums = (arr: number[]): number[] => arr.filter(el => el >0);

getPositiveNums([1, -2, 5, 10]);// [1, 5, 10]
getPositiveNums([3, -10]);// [3]

// 2. Функция принимает массив с числами, строками и булевыми значениями и возвращает массив с числами

const getNumbers = (arr: (string | number | boolean)[]): number[] => arr.filter(el => typeof el === 'number');

getNumbers([1, 'hello', true, 5]); // [1, 5]

// 3. Функция принимает строку и возвращает ее длину

const getStringLength = (str: string): number => str.length;

getStringLength('hi'); // 2
getStringLength('hello'); // 5

// 4. Функция принимает строку и число. Если длина строки равна числу, тогда вернуть true. В ином случае - false.

const compareArgs = (str: string, num: number): boolean => str.length === num;

compareArgs('hi', 2); // true
compareArgs('hello', 2); // false
// важен порядок ввода!!! сначала строка, затем число

// 5. Функция принимает строку и число. Если длина строки равна числу, тогда вернуть true. В ином случае - false. Второй аргумент необязателен

const compareArgs2 = (str: string, num?: number): boolean => str.length === num;

compareArgs2('hi', 2); // true
compareArgs2('hi'); // false

// ИНТЕРФЕЙСЫ

interface Product {
    id: number,
    title: string,
    price: number,
    in_store: boolean,
    countries?: string[] // знак ? делает аргумент необязательным
}

const apple: Product = {
    id: 1,
    title: "Golden Apple",
    price: 100,
    in_store: true,
    countries: ['USA', 'Germany']
}

const orange: Product = {
    id: 2,
    title: "Red Orange",
    price: 40,
    in_store: false,
}

// 6. Функция принимает объект пользователя и возвращает возраст пользователя

interface User {
    id: number,
    name: string,
    age: number
}

const getAge = (user: User): number => user.age;

// 7. Функция принимает массив пользователей (объекты) и возвращает массив с совершеннолетними пользователями

[{id: 1, name: 'Anna', age: 20}, {id: 2, name: 'Oleg', age: 10}, {id: 3, name: 'Petr', age: 67}]

const getAdults = (arr: User[]): User[] => arr.filter(el => el.age > 18);

getAdults([{id: 1, name: 'Anna', age: 20}, {id: 2, name: 'Oleg', age: 10}, {id: 3, name: 'Petr', age: 67}]
); 


interface Animal {
    id: number,
    name: string,
    age: number,
    makes_sound: (str: string) => string
}



