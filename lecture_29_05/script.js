// Callback-функция - это функция, которая передана в другую функцию в качестве аргумента
// Функция высшего порядка (HOF) - это функция, которая: 1. принимает другую функцию в качестве аргумента или 2. которая возвращает другую функцию.

    const a = () => 2 + 2;
    const b = () => 2 + 3;
    const c = () => 2 + 4;

    const f = arg => 2 + arg;

// 1. написать функцию, которая принимает массив чисел и возвращает новый массив с числами, умноженными на 2



// 2. написать функцию, которая принимает массив чисел и возвращает новый массив с числами, поделенными на 10

    const divideNumbers = arr => {
        const newArr = [];

        for(let i = 0; i < arr.length; i++) {
            newArr.push(arr[i] / 10)
        }
        return newArr
    }

// 3. написать функцию, которая принимает массив чисел и возвращает новый массив с измененными числами

    const changeNumbers = (arr, instruction) => {
        const newArr = [];

        for(let i = 0; i < arr.length; i++) {
            newArr.push(instruction(arr[i]))
        }
        return newArr
    }

    console.log(changeNumbers([1, 2, 3, 4], (arg) => arg * 2))
    console.log(changeNumbers([1, 2, 3, 4], (arg) => arg / 2))
    console.log(changeNumbers([1, 2, 3, 4], (arg) => arg - 10))


// 4. Реализовать функцию, которая принимает массив чисел и возвращает новый массив с положительными четными числами из входящего массива (FILTER)
    const getPositiveNums3 = arr => arr.filter(el => el > 0 && el % 2 === 0);


// 5. Реализовать функцию, которая принимает массив чисел и возвращает новый массив с положительными числами из входящего массива, умноженными на 2
    const getPosNumbersMult = arr => arr
                                        .filter(el => el > 0)
                                        .map(el => el * 2);

// 6. Реализовать функцию, которая принимает массив чисел и возвращает сумму  значений (REDUCE)
    const getSum = arr => arr.reduce((acc, el) => el + acc, 0);
    console.log(getSum([10, 20, 30, 4])); //64

// 7. Реализовать функцию, которая посчитает стоимость продуктов в корзине
    const productsInCart = [
        {id: 1, name: 'apple', price: 100},
        {id: 2, name: 'orange', price: 15},
        {id: 3, name: 'kiwi', price: 75},
    ]

    const getSumInCart = arr => arr.reduce((acc, el) => el.price + acc, 0);
    console.log(getSumInCart(productsInCart));

// Методы массивов

    // 1. Простые методы

        // push(arg)
        // pop()
        // shift()
        // unshift()

    // 2. Методы, принимающие callback

        // .forEach(() => {}) - применяет переданную функцию к каждому элементу массива, возвращает undefined, поэтому мы должны прописать, что нам необходимо вернуть
            const incrNumbers1 = arr => {
                const newArr = [];
                arr.forEach(el => newArr.push(el * 2));
                return newArr
            }

            const getPositiveNums = arr => {
                const newArr = [];
                arr.forEach(el => {
                    if(el > 0) {
                        newArr.push(el)
                    }
            });
                return newArr
            }

        // .map(() => {}) - применяет переданную функцию к каждому элементу массива, возвращает новый массив (в одну строку делает все, что прописывается в forEach). Не меняет длину массива, но меняет элементы.
            const incrNumbers2 = arr => arr.map(el => el * 2);

        // .filter(() => {}) - возвращает новый массив с элементами, прошедшими по переданному условию. Не меняет элементы, но меняет длину массива.
            const getPositiveNumbers2 = arr => arr.filter(el => el > 0);
            
        // .sort(() => {})

        // .reduce(() => {})
            // см задачу 7



