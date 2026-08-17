import http from 'http';
import "dotenv/config";
import { users } from './users.js';

// const PORT = 4000;
const PORT = process.env.PORT;

// // Функция-обработчик (requestListener) вызывается на КАЖДЫЙ запрос
const server = http.createServer((req, res) => {
    console.log(`[${new Date().toLocaleString('ru-RU')}] ${req.method}`);
   
    // Говорим браузеру: "Я отправляю тебе JSON"
    res.setHeader('Content-Type', 'application/json');

    // Говорим: "Всё прошло успешно"
    // res.statusCode = 200;

    // Отправляем тело ответа (должно быть строкой или буфером!)
    // res.end(JSON.stringify(users));

    if (req.url === '/' && req.method === 'GET') {
        res.end('Home page');
    } else if (req.url === '/users' && req.method === 'GET') {
        res.end(JSON.stringify(users));
    } else {
        res.statusCode = 404;
        res.end('Page not found');
    }

});

// Запуск прослушки порта
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});