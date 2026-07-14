import 'dotenv/config';
import { getPow, getSum } from "./math.js";
import chalk from 'chalk';

console.log(getSum(50, 6));
console.log(getPow(20, 2));

console.log(process.env.PORT);
console.log(process.env.DB_PASSWORD);

console.log(chalk.blue('Hello^ world!'));
console.log(chalk.bgRed('ERROR'));
console.log(chalk.green('ERROR_2'));

