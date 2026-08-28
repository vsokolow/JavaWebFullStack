import express from 'express'
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler.js';
import { requestTimeAndUser } from './middleware/requestTimeAndUser.js';
import usersRouter from './routes/usersRouter.js';
import postsRouter from './routes/postsRouter.js';

const app = express();
const PORT = 3000;

// MIDDLEWARE

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(requestTimeAndUser);


// ROUTES

app.get("/", (req, res) => {
    res.send("Home page")
})

app.use('/users', usersRouter);
app.use('/posts', postsRouter);


// ERROR HANDLER
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});