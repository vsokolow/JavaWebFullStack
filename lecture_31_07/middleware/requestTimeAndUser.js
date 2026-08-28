export const requestTimeAndUser = (req, res, next) => {
    req.requestTime = moscowTime; // Обогащаем объект запроса
    req.user = { id: 1, name: "Alice"}
    console.log(`Запрос начат ${req.requestTime}. Передан пользователь ${req.user.name}`);
    next(); // Передаем управление дальше! };
};

const timestamp = Date.now();
const moscowTime = new Date(timestamp).toLocaleString('ru-RU', {
  timeZone: 'Europe/Moscow'
});