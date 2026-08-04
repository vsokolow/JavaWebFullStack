// *********
// TASK 1
// *********

// Создайте веб-страницу с формой для ввода имени пользователя и выбора темы (светлая или темная). При нажатии на кнопку "Сохранить", сохраняйте имя пользователя и выбранную тему в localStorage. При загрузке страницы, если данные присутствуют в localStorage, автоматически заполняйте форму сохраненными значениями и применяйте выбранную тему.

// Находим все нужные элементы на странице по их ID
const form = document.getElementById('settingsForm');
const usernameInput = document.getElementById('username');
const themeSelect = document.getElementById('theme');
const saveButton = document.getElementById('saveButton');
const body = document.body;

// =========================================================================
// 1. ЗАГРУЗКА ДАННЫХ ПРИ ОТКРЫТИИ СТРАНИЦЫ
// =========================================================================

// Пытаемся достать сохраненные имя и тему из localStorage [INDEX]
const savedUsername = localStorage.getItem('appUsername');
const savedTheme = localStorage.getItem('appTheme');

// Если имя было сохранено, автоматически вставляем его в поле ввода [INDEX]
if (savedUsername) {
    usernameInput.value = savedUsername;
}

// Если тема была сохранена, выставляем её в списке и применяем к странице [INDEX]
if (savedTheme) {
    themeSelect.value = savedTheme; // Синхронизируем выпадающий список
    body.className = savedTheme;    // Применяем класс 'light' или 'dark' к тегу <body> [INDEX]
} else {
    // Если страница открывается первый раз и в памяти ничего нет,
    // по умолчанию ставим светлую тему, которая прописана в HTML
    body.className = 'light';
}

// =========================================================================
// 2. СОХРАНЕНИЕ ДАННЫХ ПО КЛИКУ НА КНОПКУ
// =========================================================================

// Слушаем клик по кнопке "Сохранить"
saveButton.addEventListener('click', () => {
    // Забираем текущие значения из формы, которые ввел пользователь
    const currentUsername = usernameInput.value;
    const selectedTheme = themeSelect.value;

    // Записываем эти значения в localStorage [INDEX]
    localStorage.setItem('appUsername', currentUsername);
    localStorage.setItem('appTheme', selectedTheme);

    // Мгновенно применяем выбранную тему к странице, меняя класс у body [INDEX]
    body.className = selectedTheme;
});

// *********
// TASK 2
// *********

// Создайте веб-страницу с формой для ввода данных (например, имя, email и сообщение). При изменении данных в форме, сохраняйте их в sessionStorage. При перезагрузке страницы, если данные присутствуют в sessionStorage, автоматически заполняйте форму сохраненными значениями.

const dataForm = document.getElementById('data-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

// =========================================================================
// ШАГ 1: АВТОЗАПОЛНЕНИЕ ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ
// =========================================================================
// Пытаемся достать сохраненную строку из sessionStorage
const saveDataString = sessionStorage.getItem('formDataDraft');
// Если данные есть, распаковываем JSON-строку в объект и заполняем поля
if (saveDataString) {
    const saveData = JSON.parse(saveDataString);

    nameInput.value = saveData.name || '';
    emailInput.value = saveData.email || '';
    messageInput.value = saveData.message || '';
}

// =========================================================================
// ШАГ 2: СОХРАНЕНИЕ ДАННЫХ В РЕАЛЬНОМ ВРЕМЕНИ (При каждом вводе символа)
// =========================================================================

// Вешаем обработчик события 'input' на всю форму.
// Благодаря "всплытию событий" в JS, этот обработчик поймает ввод в любом из полей формы!
dataForm.addEventListener('input', () => {
    // Собираем текущие значения из всех полей в один объект
    const currentData = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    };
    // Переводим объект в строку JSON и сохраняем в sessionStorage
    sessionStorage.setItem('formDataDraft', JSON.stringify(currentData));
});

// =========================================================================
// ШАГ 3: ОЧИСТКА ПО КНОПКЕ RESET
// =========================================================================

// Добавим логику для нашей кнопки Reset, чтобы форма не просто очищалась на экране,но и стирала черновик из памяти сессии
resetBtn.addEventListener('click', () => {
    // Очищаем саму HTML-форму
    dataForm.reset();

    // Удаляем запись из sessionStorage
    sessionStorage.removeItem('formDataDraft');
});

// *********
// TASK 3 WebSocket
// *********

// Создайте HTML-страницу с полем ввода и кнопкой для отправки сообщений. Напишите JavaScript-код, который устанавливает соединение с WebSocket-сервером по адресу ws://localhost:8080. При нажатии на кнопку, отправьте сообщение на сервер и отобразите все полученные сообщения в отдельном блоке на странице.

const ws = new WebSocket('ws://localhost:8080');
const messages = document.getElementById('messages');

ws.addEventListener('open', (event) => {
        console.log('Connected to the WebSocket server');
        // ws.send('Hello WebSocket!');
    });

ws.onmessage = function (event) {
    //TODO:
    const message = document.createElement('p');
    message.textContent = event.data;
    messages.appendChild(message);
};

document.getElementById('sendButton').onclick = function () {
    //TODO:
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
        messageInput.value = '';
    } else {
        console.warn('Невозможно отправить сообщение: соединение не установлено.');
    };
};

ws.onerror = function (error) {
    console.error('Ошибка WebSocket:', error);
};