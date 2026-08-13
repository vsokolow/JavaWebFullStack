// process.nextTick() и  setImmediate() - есть только в NodeJS

// console.log("Start");

// setTimeout(() => {
//     console.log("Timer")
// }, 1000)

// setImmediate(() => {
//     console.log("Immediate")
// });

// process.nextTick(() => {
//     console.log("Nexttick")
// });

// Promise.resolve().then(() => console.log("Promise"));

// console.log("End");

// ВЫВОД в консоль:
// Start End Nexttick Promise Immediate Timer - Common JS
// Start End Promise Nexttick Immediate Timer - ES Modules


// =================================


// readFile vs readFileSync

// import fs from "fs";

// console.log("1");

// ВЕРСИЯ 1: readFileSync
// const data = fs.readFileSync("big.txt", "utf-8");
// console.log(data);


// ВЕРСИЯ 2: readFile
// fs.readFile('big.txt', 'utf-8', (err, data) => {
//     console.log(data)
// });

// console.log("3");


// =====================================


import util from 'util';
// import fs from 'fs'
import fs from 'fs/promises';

// Превращаем callback-функцию в promise-функцию

// const readFilePromise = util.promisify(fs.readFile);
                                // это вариант используется при import fs from 'fs'
// readFilePromise('big.txt')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

                                // это вариант используется при import fs from 'fs/promises'
// fs.readFile('big.txt', 'utf-8')
//     .then(data => console.log(data))
//     .catch(err => console.log(err));


// =========================================
// catch для обработки ошибок

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

// console.log(process.argv);

console.log(process.env.PORT);

