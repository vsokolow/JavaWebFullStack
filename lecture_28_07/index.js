import 'dotenv/config'
import express from 'express'
import { users } from './users.js'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.get('/users/:user_id', (req, res) => {
    console.log(req.params);
    res.json(req.params);
});
app.get('/products', (req, res) => {
    console.log(req.query);
    res.json(req.query);
});
app.post('/products', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});
app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});