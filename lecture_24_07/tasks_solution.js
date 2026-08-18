import http from 'http';
import "dotenv/config";
const PORT = process.env.PORT;

import { users } from './users.js';
import { text } from 'stream/consumers';
import { time } from 'console';

// ===================Пример: сервер, который отвечает по разным адресам
// Давайте напишем мини-сервер, который по разным путям отвечает по-разному. Это основа для будущей маршрутизации.

let todos = [
    { id: 1, text: 'Купить хлеб', done: false },
    { id: 2, text: 'Позвонить маме', done: true }
];

const server = http.createServer((req, res) => {

    const url = new URL(req.url, `http://${req.headers.host}`);

    console.log(`${req.method} ${req.url}`);

    // 1. Главная
    if (url.pathname === '/') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>Главная страница</h1><p>Добро пожаловать! <a href="/about">О сервере</a> | <a href="/api">API</a></p>');
    } 
    // 2. О сайте
    else if (url.pathname === '/about') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>О сайте</h1><p>Этот server написан на Node.js<br><a href="/">На главную</a></p>');
    } 
    // 3. API общего статуса (исправлено на url.pathname для надежности)
    else if (url.pathname === '/api') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ message: 'Это API', status: 'ok', time: new Date().toISOString() }));
    }  
    // 4. API пользователя
    else if (url.pathname === '/api/user') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8'); // Исправлено с application.json на application/json
        res.end(JSON.stringify({ name: 'Vasya', age: 25}));
    } 
    // 5. Эхо-сервер
    else if (req.method === 'POST' && url.pathname === '/echo') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end(JSON.stringify({ received: data }));
            } catch (err) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end('Некорректный JSON');
            }
        });
    }  
    // 6. Получить список задач (GET /api/todos)
    else if (req.method === 'GET' && url.pathname === '/api/todos') {
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(todos));
    }
    // 7. Добавить задачу (POST /api/todos) — ТЕПЕРЬ ОНА ЧАСТЬ ОБЩЕЙ ЦЕПОЧКИ
    else if (req.method === 'POST' && url.pathname === '/api/todos') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const newTodo = {
                    id: todos.length + 1,
                    text: data.text || '',
                    done: false
                };
                todos.push(newTodo);
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end(JSON.stringify(newTodo));
            } catch (e) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end('Некорректный JSON');
            }
        });
    } 
    // 8. Финальный ЕДИНСТВЕННЫЙ обработчик для всех остальных случаев
    else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Страница не найдена');
    }
});

// Запуск прослушки порта
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




