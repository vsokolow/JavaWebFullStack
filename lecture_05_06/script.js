class Employee {
    constructor(name, salary){
        this.name = name;
        this.salary = salary;
    }

    introduce(){
        console.log(`My name is ${this.name}`)
    }
}

class Developer extends Employee {
    constructor(name, salary, progLanguage) {
        super(name, salary);

        this.progLanguage = progLanguage;
    }

    writeCode(){
        console.log(`${this.name} whrites code`)
    }
}

class Manager extends Employee {
    manage(){
        console.log(`${this.name} manages`)
    }
}

const frontendDeveloper = new Developer('Oleg', 4000, 'JS');
const backendDeveloper = new Developer('Anna', 4000, 'Phyton');
const projectManager = new Manager('Anna', 4500);

console.log(frontendDeveloper);
console.log(backendDeveloper);

console.log(projectManager);

// ПОЛИМОРФИЗМ

class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    speak(){
        console.log(`${this.name} make noice`)
    }
}

class Dog extends Animal {
    speak(){
        console.log(`${this.name} barks`)
    }
}

class Cat extends Animal {
    speak(){
        console.log(`${this.name} meows`)
    }
}

const dog = new Dog('Max', 5);
const cat = new Cat('Barsik', 3);

dog.speak();
cat.speak();

// МИКСИНЫ

