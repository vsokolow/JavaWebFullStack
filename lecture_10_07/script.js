// iterable - объект, по которому можно итерироваться
// iterator - механизм итерирования

const numbers = [1, 4, 7, 10];

const user = {
    id: 1,
    firstname: 'Anna',
    lastname: 'Ivanova',
    age: 19
}

for(const item of numbers) {
    console.log(item)
} //итерация массива

// НЕЛЬЗЯ итерировать объект!
// for(const item of user) {
//     console.log(item)
// }


console.log(Object.keys(user)); //['id', 'firstname', 'lastname', 'age']
console.log(Object.values(user)); //[1, 'Anna', 'Ivanova', 19]
console.log(Object.entries(user)); //[Array(2), Array(2), Array(2), Array(2)]

const entries = Object.entries(user);
console.log(Object.fromEntries(entries)); //{id: 1, firstname: 'Anna', lastname: 'Ivanova', age: 19} преобразует массив обратно в объект

//1. Найти сумму значений из массива numbers
// => 22

let sum = 0;
for(const item of numbers){
    sum += item
}

const sum2 = numbers.reduce((acc, el) => acc + el, 0);

console.log(sum);
console.log(sum2);

//ГЕНЕРАТОР - это функция, котора может возвращать значения по одному

function* generateNumbers(){
    yield 1
    yield 2
    yield 3
}

const iterator = generateNumbers();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

for(const item of generateNumbers()) {
    console.log(item);
}

