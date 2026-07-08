            // ЗАДАЧА 1

console.log('A');//синхроный код

setTimeout(() => console.log('B'), 0);//макро таска

Promise.resolve().then(() => console.log('C'));//микро таска

console.log('D');//синхронный код

//eventLoop обрабатывает в такой последовательности: синхронный код, микро таски, макро таски
// Вывод: A D C B


            // ЗАДАЧА 2

console.log('1');

setTimeout(() => console.log(2), 0);
setTimeout(() => console.log(3), 0);

Promise.resolve().then(() => console.log('4'));
Promise.resolve().then(() => console.log('5'));

console.log('6');

// Вывод: 1 6 4 5 2 3 


            // ЗАДАЧА 3

console.log('1');

setTimeout(() => console.log(2), 3000);
setTimeout(() => console.log(3), 0);

Promise.resolve().then(() => console.log('4'));
Promise.resolve().then(() => console.log('5'));

console.log('6');

// Вывод: 1 6 4 5 3 2


            // ЗАДАЧА 4

console.log('start');

async function foo() {
    console.log('foo start');
    await null;// все после await идет в очередь микро тасок
    console.log('foo end');// микро таска
}

foo();

console.log('end');

// Вывод: start, foo start, end, foo end


            // ЗАДАЧА 4.1 добавим setTimeout в функцию

console.log('start');

async function foo() {
    console.log('foo start');
    setTimeout(() => {
        console.log('timer')
    }, 0)//макро таска
    await null;// все после await идет в очередб микро тасок
    console.log('foo end');// микро таска
}

foo();

console.log('end');

// Вывод: start, foo start, end, foo end, timer




