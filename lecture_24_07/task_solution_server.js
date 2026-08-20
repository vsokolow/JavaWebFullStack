import http from 'http';
import "dotenv/config";
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    console.log('Поступил запрос:', req.method, req.url);
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);


    // Главная страница
    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>Главная страница</h1><a href="/about">О нас</a>');
        return;
    }
    // О нас
    if (req.method === 'GET' && parsedUrl.pathname === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>О нас</h1><p>Этот сервер написан на чистом Node.js!</p><a href="/">На главную</a>');
        return;
    }
    // API: текущее время
    if (req.method === 'GET' && parsedUrl.pathname === '/api/time') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ time: new Date().toLocaleTimeString() }));
        return;
    }
    //В качестве практики добавим новый маршрут: /hello?name=Иван — возвращает приветствие с именем из query-параметра
    if (req.method === 'GET' && parsedUrl.pathname === '/hello') {
        const name = parsedUrl.searchParams.get('name') || 'Гость';
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>Привет, ${name}!</h1>`);
        return;
    }
    // Теперь можно отправить POST-запрос с помощью Postman или curl, и сервер вернёт то, что вы ему отправили
    if (req.method === 'POST' && parsedUrl.pathname === '/api/echo') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ youSent: body }));
        });
    return;
    }
    // 404 Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');

});

server.listen(PORT, () => {
    console.log('Сервер запущен на http://localhost:${PORT}');
});