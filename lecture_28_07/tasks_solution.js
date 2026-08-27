// Импортируем модуль express
import express from 'express'

// Встроенный модуль Node.js для работы с путями
import path from 'path';

// Импортируем утилиту для работы с путями URL
import { fileURLToPath } from 'url'; // Импортируем утилиту для работы с путями URL

// Создаем приложение
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

// Указываем порт для сервера
const PORT = 3000;

// Массив для хранения заметок в памяти
const notes = [];

// Middleware для парсинга JSON в теле запроса
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. ОТДАЕМ HTML-ФАЙЛ: При заходе на главную страницу
app.get('/', (req, res) => {
  // Находим index.html в текущей папке и отправляем его в браузер
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/notes', (req, res) => {
    // Просто возвращаем весь массив заметок клиенту
    res.json(notes);
});

// Маршрут для обработки POST-запросов на "/notes"
app.post('/notes', (req, res) => {
  // Извлекаем поле "text" из тела запроса
    const { text } = req.body;

  // Проверяем, что поле "text" присутствует
    if (!text) {
    // Если поле отсутствует, возвращаем ошибку 400
        return res.status(400).json({error: 'Поле text обязательно'});
    }
  // Создаем новую заметку с уникальным id
    const newNote = {
        id: notes.length ? notes[notes.length - 1].id + 1 : 1,
        text
    };
  // Добавляем новую заметку в массив
    notes.push(newNote);

  // Возвращаем созданную заметку с кодом 201
    res.status(201).json(newNote);
});

app.get('/notes/:id', (req, res) => {
    // 1. Извлекаем id из параметров строки и переводим его в число
    const noteId = Number(req.params.id);
    // 2. Ищем заметку в массиве notes с совпадающим id
    const currentNote = notes.find(note => note.id === noteId);
    // 3. Если заметка не найдена, возвращаем ошибку 404
    if (!currentNote) {
        return res.status(404).json({ error: 'Заметка с таким ID не найдена' });
    }
    // 4. Если нашли — отправляем её клиенту
    return res.json(currentNote);
});

// ==============
// Task 2
// ==============

// Суммирование двух чисел из query-параметров

// Создаем маршрут /add
app.get('/add', (req, res) => {
  // Получаем параметры a и b из строки запроса
    

  // Преобразуем параметры к числовому типу
    const a = Number(req.query.a);
    const b = Number(req.query.b);
  // Проверяем валидность входных данных
    
    // Если хотя бы один из параметров некорректен, возвращаем статус 400 и сообщение об ошибке
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send('Invalid input');
    }
  // Вычисляем сумму
    const result = a + b;
  // Возвращаем результат в формате "Result: X"
    res.send(`Result: ${result}`);
});

// http://localhost:3000/add?a=3&b=10
// Result: 13


// ==============
// Task 3
// ==============

// Фильтрация массива по нескольким query-параметрам

// Массив книг
const books = [
  { id: 1, title: 'Node.js Guide', author: 'Alice' },
  { id: 2, title: 'Express in Action', author: 'Bob' },
  { id: 3, title: 'Learn JavaScript', author: 'Alice' }
];

// Маршрут для обработки GET-запросов на /books
app.get('/books', (req, res) => {
    let result = books;
  // Получаем query-параметры author и title
    
  // Фильтруем книги по переданным параметрам
        
  // Если передан параметр author, фильтруем книги по автору (без учета регистра)
    if (req.query.author) {
        result = result.filter(book =>
            book.author.toLowerCase() === req.query.author.toLowerCase()
        );
    }

  // Если передан параметр title, фильтруем книги по названию (без учета регистра)
    if (req.query.title) {
        result = result.filter(book =>
            book.title.toLowerCase().includes(req.query.title.toLowerCase())
        );
    }

  // Возвращаем отфильтрованный массив книг в формате JSON
    res.json(result);
});

// ==============
// Обработчик формы HTML
// ==============

// Временное хранилище (массив) для отзывов в памяти сервера
const feedbacks = [];

app.post('/feedback', (req, res) => {
  // req.body теперь содержит поля из формы
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).send('Все поля обязательны!');
  }
  // Создаем объект отзыва и добавляем в него дату
    const newFeedback = {
        name,
        message,
        createdAt: new Date()
    };
// Сохраняем в наш массив
  feedbacks.push(newFeedback);

// Выводим в консоль сервера обновленный список для проверки
  console.log('Все отзывы на сервере:', feedbacks);

// Отправляем ответ пользователю
  res.send(`Спасибо, ${name}, ваш отзыв получен!`);
});

// 2. ДОБАВИЛИ: Маршрут для просмотра всех отзывов (GET)
app.get('/feedbacks', (req, res) => {
  // Отправляем весь массив в формате JSON
  res.json(feedbacks); 
});


// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
