import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = 'data';
const ENTRIES_FILE = 'entries.json';
const fullFilePath = path.join(process.cwd(), DATA_DIR, ENTRIES_FILE); // Абсолютный путь к файлу данных

// Для чтения содержимого директории (список файлов и поддиректорий) используется readdir:
async function listDataFiles() {
    const dirPath = path.join(process.cwd(), DATA_DIR);
    try {
        const files = await fs.readdir(dirPath); // Читаем содержимое директории
        console.log(`\nФайлы в директории ${DATA_DIR}:`);
        if (files.length === 0) {
            console.log('Директория пуста.');
        } else {
            files.forEach(file => console.log(`- ${file}`));
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Директория ${DATA_DIR} не существует.`);
        } else {
            console.error(`Ошибка при чтении директории ${dirPath}:`, error.message);
            throw error;
        }
    }
}

/**
 * Загружаем записи дневника из JSON-файла.
 * Если файл не найден или некорректен, возвращаем пустой массив.
 */
async function loadJournalEntries() {
    try {
        const data = await fs.readFile(fullFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`Файл ${ENTRIES_FILE} не найден. Начинаем с пустого дневника.`);
            return []; // Файл не существует, возвращаем пустой массив
        } else if (error instanceof SyntaxError) {
            console.error(`Ошибка парсинга JSON в файле ${ENTRIES_FILE}:`, error.message);
            return []; // Файл есть, но JSON некорректен
        } else {
            console.error('Неизвестная ошибка при загрузке записей:', error.message);
            throw error; // Бросаем ошибку дальше, если это что-то критическое
        }
    }
}

/**
 * Сохраняем записи дневника в JSON-файл.
 */
async function saveJournalEntries(entries) {
    try {
        // Убедимся, что директория существует
        // { recursive: true } означает, что создаст все несуществующие родительские папки
        await fs.mkdir(path.join(process.cwd(), DATA_DIR), { recursive: true });

        const dataToSave = JSON.stringify(entries, null, 2);
        await fs.writeFile(fullFilePath, dataToSave, 'utf8');
        console.log('Записи дневника успешно сохранены.');
    } catch (error) {
        console.error('Ошибка при сохранении записей:', error.message);
        throw error;
    }
}

/**
 * Добавляем новую запись в дневник.
 */
async function addEntry(text) {
    const entries = await loadJournalEntries();
    const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
    const newEntry = {
        id: newId,
        date: new Date().toISOString().split('T')[0],
        text: text
    };
    entries.push(newEntry);
    await saveJournalEntries(entries);
    console.log(`Добавлена запись #${newEntry.id}: "${newEntry.text}"`);
}

// Запускаем наше приложение
async function runJournal() {
    console.log('--- Приложение "Мой Дневник" ---');

    // Добавим пару записей
    await listDataFiles();
    await addEntry('Сегодня я написал первую программу на Node.js!');
    await addEntry('Работа с файлами становится понятнее.');

    // Прочитаем все записи
    const allEntries = await loadJournalEntries();
    console.log('\n--- Все записи дневника ---');
    if (allEntries.length === 0) {
        console.log('Дневник пока пуст.');
    } else {
        allEntries.forEach(entry => {
            console.log(`${entry.date} [ID:${entry.id}]: ${entry.text}`);
        });
    }

// runJournal().catch(console.error); // Запускаем и ловим любые ошибки

// Удалим одну запись (например, самую первую)
    if (allEntries.length > 0) {
        const entryToRemoveId = allEntries[0].id;
        const updatedEntries = allEntries.filter(e => e.id !== entryToRemoveId);
        await saveJournalEntries(updatedEntries);
        console.log(`\nЗапись с ID ${entryToRemoveId} удалена.`);
    }

// Проверим, что осталось
    const remainingEntries = await loadJournalEntries();
    console.log('\n--- Записи после удаления ---');
    remainingEntries.forEach(entry => {
        console.log(`${entry.date} [ID:${entry.id}]: ${entry.text}`);
    });
}

runJournal().catch(console.error); // Запускаем и ловим любые ошибки
