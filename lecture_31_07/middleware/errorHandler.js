// ERROR HANDLER

export const errorHandler = ((err, req, res, next) => { 
    console.error(err.stack); // Лог для разработчика
    // Ответ для клиента
    res.status(500).json({ 
        status: "error",
        message: "Something went wrong!" 
    });
});