import fs from "fs"
import path from "path";

// fs.readFile('hello.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error('Ошибка при чтении файла:', err);
//         return;
//     }
//     console.log('Содержимое файла:', data);
// });

// fs.appendFile('hello.txt', 'Новая запись в файле\n', 'utf8', (err) => {
//     if (err) {
//         console.error('Ошибка при добавлении в файл:', err);
//         return;
//     }
//     console.log('Запись добавлена в hello.txt');
// })

// напишем простую функцию для логирования сообщений в файл

function logMessage(message) {
    const now = new Date().toISOString();
    const logline = `[${now}] ${message}\n`;

    fs.appendFile('app.log', logline, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка при логировании:', err);
        }
    });
}

logMessage('Приложение запущено');
logMessage('Что-то произошло...');


// =================Удаление несуществующего файла:

fs.unlink('note.txt', (err) => {
  if (err) {
    console.error('Ошибка при удалении файла:', err.message); 
    return;
  }
  console.log('Файл успешно удалён!');
});
// РЕЗУЛЬТАТ: Ошибка при удалении файла: ENOENT: no such file or directory, unlink 'note.txt'

// ==================Получение абсолютного пути: path.resolve()

console.log(path.resolve());

function printFilePath(filename) {
    const filesDir = 'lecture_21_07';
    const filePath = path.join(filesDir, filename);
    const absolutePath = path.resolve(filePath);
    const fileName = path.basename(filePath);
    const parentDir = path.dirname(filePath);

    console.log('Относительный путь:', filePath);
    console.log('Абсолютный путь:', absolutePath);
    console.log('Имя файла:', fileName);
    console.log(`Расширение файла: ${path.extname(absolutePath)}`);
    console.log('Папка:', parentDir);
}

printFilePath('hello.txt');

// =============Преобразование объекта в строку JSON:

// Создаем объект с полями name и age
const person = {
  name: "John Doe", // Поле name строкового типа
  age: 30           // Поле age числового типа
};

// Преобразуем объект в строку JSON с помощью JSON.stringify
const jsonString = JSON.stringify(person);

// Выводим результат преобразования в консоль
console.log(jsonString);

// ==============Чтение и парсинг JSON-файла:

const data = fs.readFileSync('package.json', 'utf8');

// Парсинг содержимого файла в массив объектов с помощью JSON.parse
const parsedData = JSON.parse(data);

// Получение значения поля title первого элемента массива (индекс 0)
const firstTitile = parsedData;

// Вывод результата в консоль
console.log('Первое свойство файла: ', firstTitile.name);