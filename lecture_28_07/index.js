import 'dotenv/config'
import express from 'express'
import { users } from './users.js'

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
res.json({ message: 'Hello' });
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/secret', (req, res) => {
// Красивая цепочка: статус -> данные
res.status(403).json({ error: 'Access Denied' });
});

app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});

