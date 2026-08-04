const { WebSocketServer } = require('ws');

// Создаем сервер на порту 8080
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Браузер успешно подключился!');

  ws.on('message', (message) => {
    // Преобразуем буфер в текст
    const textMessage = message.toString();
    console.log(`Получено: ${textMessage}`);
    
    // Отправляем обратно в браузер (эхо)
    ws.send(textMessage);
  });
});

console.log('WebSocket-сервер запущен на ws://localhost:8080');
