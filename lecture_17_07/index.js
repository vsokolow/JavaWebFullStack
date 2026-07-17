// console.log("Start");

// setTimeout(() => {
//     console.log("Timer")
// }, 1000)

// setImmediate(() => {
//     console.log("Immediate")
// });

// process.nextTick(() => {
//     console.log("Next tick")
// });

// Promise.resolve().then(() => console.log("Promise"));

// console.log("End");



// =================================
// readFile vs readGileSync

// import fs from "fs";

// console.log("1");

// const data = fs.readFileSync("big.txt", "utf-8");
// console.log(data);

// fs.readFile('big.txt', 'utf-8', (err, data) => {
//     console.log(data)
// });

// console.log("3");


// =====================================

import util from 'util';
import fs from 'fs/promises';

// Превращаем callback-функцию в promise-функцию
// const readFilePromise = util.promisify(fs.readFile);
// readFilePromise('big.txt')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

// fs.readFile('big.txt', 'utf-8')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));


// =========================================

async function demo() {
    throw new Error("BOOM")
}

async function main() {
    try {
        await demo()
    } catch (error) {
        console.log(error.message)
    }
}

main();
// demo();

// =========================================

import 'dotenv/config';
console.log(process.env.PORT);