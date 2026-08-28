# JavaWebFullStack

Учебный репозиторий с практическими заданиями и материалами занятий по курсу **Java Web Full Stack**. Курс идёт от основ JavaScript и вёрстки — через DOM и асинхронность — к Node.js, **Express** и **TypeScript**.

> ⚠️ Это учебный архив, а не готовый портфолио-проект. Материалы организованы по датам занятий и могут содержать черновой, незавершённый или экспериментальный код.

Каждая папка соответствует отдельному занятию и названа по дате его проведения (`lecture_ДД_ММ`).

## Стек технологий

- **HTML / CSS / JavaScript** — основы и DOM
- **Node.js** — файловая система, HTTP-сервер, модули
- **Express.js** — роутинг, middleware, обработка ошибок
- **TypeScript** — типизация, интерфейсы, классы, модули

## Как запустить

**Frontend-занятия** — это, как правило, отдельные HTML-страницы с подключёнными CSS и JS:

```bash
git clone https://github.com/vsokolow/JavaWebFullStack.git
cd JavaWebFullStack/lecture_XX_XX
```

Открыть `index.html` в браузере.

**Node.js / Express-занятия**:

```bash
cd JavaWebFullStack/lecture_XX_XX
npm install
node index.js   # или команда из package.json конкретного занятия
```

**TypeScript-занятия** обычно требуют `ts-node` или предварительной компиляции:

```bash
npm install
npx ts-node index.ts
# либо
npx tsc && node dist/index.js
```

## Статус

Репозиторий пополняется по мере прохождения курса. Отдельные пет-проекты на основе полученных навыков вынесены в отдельные репозитории.

## Автор

[vsokolow](https://github.com/vsokolow)
