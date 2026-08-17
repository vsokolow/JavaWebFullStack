import fs from "fs/promises"
// import fs from "fs"

// console.log(1);

// const data = fs.readFile("message.txt", "utf-8").then(data => console.log(data));
// const data = fs.readFileSync("message.txt", "utf-8");
// console.log(data);

// console.log(2);


// =======================
// ***** ЗАПИСЬ ФАЙЛОВ *****

// const content = "Log entry: Server started at " + new Date();

// Запись (перезапишет старое содержимое!)
// await fs.writeFile("Logs.txt", content);

// Дозапись в конец (Append)
await fs.appendFile('Logs.txt', '\nLog entry: Server started at ' + new Date());


// =======================
// ***** УДАЛЕНИЕ ФАЙЛОВ *****

// await fs.unlink('message.txt');


async function removeTempFile(path) {
    try {
        await fs.unlink(path);
        console.log(`Файл ${path} удален.`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log("Файла и так нет, ничего страшного.");
        } else {
            throw error;
        }
    }
}

// removeTempFile('message.txt');


// =======================
// ***** МОДУЛь PATH *****

import path from "path";

const fullPath = path.join('data', 'users', 'admin.json');
// console.log(fullPath);


// =======================
// ***** Относительные VS абсолютные пути

import { findPath } from "./data/data.js";

import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); 

// Путь к файлу 'data.txt', который лежит РЯДОМ со скриптом
const filePath = path.join(__dirname, 'data.txt');
// console.log(filePath);

// path.resolve склеивает пути и превращает их в абсолютный путь от корня диска
const absolute = path.resolve('public', 'images'); 
// 

const data = findPath();
// console.log(data);


// =======================
// ***** Аналог БД

const DB_PATH = path.join(__dirname, 'users.json');

async function addUser(user) {
    // 1. Читаем строку
    const rawData = await fs.readFile(DB_PATH, 'utf-8');
    
    // 2. Превращаем в массив JS
    const users = JSON.parse(rawData); 
    
    // 3. Меняем данные
    users.push(user);
    
    // 4. Превращаем обратно в строку и записываем
    // null, 2 — для красивых отступов
    await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2));
}

// addUser({ firstname: "Olga", age: 37});

// =======================
// ***** Работа с папками (директориями)

// Проверка: существует ли папка?
// (access кидает ошибку, если нет доступа/файла) 
try {
    await fs.access('temp'); 
    await fs.writeFile("temp/file1.txt", "Hello 1");
    await fs.writeFile("temp/file2.txt", "Hello 2");
} catch {
    // Если ошибка -> папки нет -> создаем
    await fs.mkdir('temp', { recursive: true });
    // recursive: true позволяет создавать вложенные пути 'a/b/c'
}
// Чтение содержимого папки
// const files = await fs.readdir('temp'); console.log(files); 
// ['file1.txt', 'file2.txt']

// Удалить папку со всем содержимым (аналог rm -rf)
await fs.rm('temp', { recursive: true,
force: true // Не ругаться, если папки уже нет 
});
