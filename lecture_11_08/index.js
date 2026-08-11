const user1 = {
    id: 1,
    firstname: "Anna",
    lastname: "Petrova",
    age: 19,
    language: ['Russian', 'English'],
    is_online: true,
    address: {
        country: 'Germany',
        city: 'Berlin',
        street: 'Achterstr.',
        bld: 1,
        postcode: 1001,
        apt: 55
    }
};
const user2 = {
    id: 2,
    firstname: "Oleg",
    lastname: "Ivanov",
    age: 50,
    language: ['Italian', 'English'],
    is_online: true,
    post_count: 32
};
const cow = {
    id: 1,
    title: 'cow',
    age: 2,
    weigth: 100,
    farm_name: 'Marusya ',
    owner_name: 'Anna'
};
const wolf = {
    id: 2,
    title: 'wolf',
    age: 3,
    weigth: 30,
    wood_name: 'Sherwood',
    has_rabies: false
};
const divideNumbers = (a, b) => a / b;
const divideNumbers2 = (a, b) => a / b;
const multNumbers = (a, b) => a * b;
const multNumbers2 = (a, b) => a * b;
// Unknown type
const getInfo = (info) => {
    if (typeof info === 'string') {
        return 'This is a string';
    }
    else if (typeof info === 'number') {
        return 'This is a number';
    }
    return 'This is neither string nor number';
};
console.log(getInfo('hello')); // This is a string
console.log(getInfo(7)); // This is a number
console.log(getInfo(true)); // This is neither string nor number
console.log(getInfo([1, 2, 3])); // This is neither string nor number
//************ЗАДАЧИ*****************
// 1. Функция getUserInfo принимает объект, соответствющий интерфейсу User и возвращает строку в формате '{firstname} {lastname}, {age} y.o.'
//мое решение
// function getUserInfo(user: User): string {
//   return `${user.firstname} ${user.lastname}, ${user.age} y.o.`;
// }
// решение Нелли
//const getUserInfo = (user: User): string => `${user.firstname} ${user.lastname}, ${user.age} y.o.`
//деструктуризация
const getUserInfo = ({ firstname, lastname, age }) => `${firstname} ${lastname}, ${age} y.o.`;
console.log(getUserInfo(user1));
//2. Функция getOnlineUsers принимает массив объектов, соответствующих интерфейсу User, и возвращает только онлайн пользователей
const getOnlineUsers = (users) => users.filter(el => el.is_online);
//3. Функция getCheapProducts принимает массив объектов, соответствующих интерфейсу Product (id, title, price, count) и возвращает все продукты, стоимость которых ниже 100
const getCheapProducts = (products) => products.filter(el => el.price < 100);
export {};
