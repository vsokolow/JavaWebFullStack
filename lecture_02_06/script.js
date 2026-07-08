const product = {
    title: "Laptop",
    price: 1200,
    currency: 'USD',

    getPrice() {
        return `${this.price} ${this.currency}`
    }
}

// 

class Product {
    constructor(title, price, currency = 'USD'){
        this.title = title;
        this.price = price;
        this.currency = currency;
    }

    getPrice() {
        return `${this.price} ${this.currency}`
    }
}

const product1 = new Product('apple', 30, 'USD');
const product2 = new Product('kiwi', 10, 'EUR');
const product3 = new Product('banana', 40, 'USD');

// console.log(product);
// console.log(product1);
// console.log(product2);
// console.log(product3);
// console.log(product3.getPrice());



const userAction = {
    login() {
        console.log(`${this.name} вошел в систему`)
    }
}

const admin = Object.create(userAction);
admin.name = 'Alex';

// console.log(admin);
// console.log(admin.login());

class User {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    login(){
        console.log(`${this.name} logged in`)
    }
}

// добавим класс Админ, который унаследует все свойства класса User, но расширим его возможности
class Admin extends User {
    constructor(name, age, role){
        super(name, age);
        this.role = role;
    }

    deleteUser(){
        console.log('The user was deleted')
    }
}

const guestUser = new User('Oleg', 50);
const adminUser = new Admin('Anna', 30, 'admin');

// console.log(guestUser);
// console.log(adminUser);

// ИНКАПСУЛЯЦИЯ

class BankAccount {
    #balance = 0;

    deposit(amount){
        this.#balance += amount
    }

    getBalance() {
        return this.#balance
    }
}

const account = new BankAccount();
// account.balance = 1000;

account.deposit(20); 
account.deposit(80); 
account.deposit(120); 

// console.log(account);

// ГЕТТЕРЫ И СЕТТЕРЫ
class Product1 {
    #price;

    set price(value) {
        if (value < 0) {
            console.log('Ошибка');
            return;
        }

        this.#price = value;
    }
    
    get price() {
        return this.#price;
    }
}

const laptop = new Product1();
laptop.price = 1000;

// console.log(laptop);

const numbers = [1, 2, 3, 4];
console.log(numbers);

