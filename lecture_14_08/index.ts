const wrap_number = (value: number) => [];
const wrap_string = (value: string) => [];
const wrap_boolean = (value: boolean) => [];

// нарушаем принцип DRY - Don’t Repeat Yourself - не повторяй сам себя!

// необходимо использовать дженерики:
function wrap<T>(value: T): T[] {
    return [value]
}

const result1 = wrap(10); // [10]
const result2 = wrap('hello'); // ['hello]
const result3 = wrap(true); // [true]

// 1. Функция принимает массив элементов и возвращает первый элемент этого массива

const getFirstElem = <T>(arr: T[]) => arr[0];

const first1 = getFirstElem([1, 2, 3]);
const first2 = getFirstElem(['hello', 'hi']);
const first3 = getFirstElem([true, false]);

interface Product {
    id: number,
    title: string,
    price: number
}

const products: Product[] = [
    {id: 1, title: "Apple", price: 100},
    {id: 2, title: "Orange", price: 150},
    {id: 3, title: "Mango", price: 90}
]

const first4 = getFirstElem(products);

// Ограничение дженериков

const getLength = <T extends { length: number }>(value: T) => value.length;

const data1 = getLength('hello'); // 5
const data2 = getLength([]); // 0
// const data3 = getLength(100); // ошибка - у number нет длины!
const data4 = getLength({ length: 7, title: "Apple", age: 10 }); // 
// const data5 = getLength({ title: "Apple", age: 10 }); // ошибка - нет свойства length!


// ENUM

enum OrderStatus {
    Created,
    Processing,
    Shipped,
    Delivered
}

const status1: OrderStatus = 1;

console.log(OrderStatus.Created); // 0

type Status = 'Created' | 'Processing' | 'Shipped' | 'Delivered';

const status3: Status = 'Created';
// const status4: Status = 'hello'; // ОШИБКА - Type '"hello"' is not assignable to type 'Status'.


// KEYOF

type ProductKeys = keyof Product;

const key1: ProductKeys = "id";
//const key2: ProductKeys = "hello"; // ОШИБКА - Type '"hello"' is not assignable to type 'keyof Product'.


// 2. Функция принимает объект и ключ, возвращает значение по ключу

const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];


getProperty({ name: "Anna", age: 20 }, 'age'); // 20
getProperty({ name: "Anna", age: 20 }, 'name'); // Anna
// getProperty({ name: "Anna", age: 20 }, 'hello'); // ошибка

