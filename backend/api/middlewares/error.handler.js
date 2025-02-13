function logErrors (err, req, res, next){
    console.log('logErrors :', err); 
    next(err);
}

function errorHandler (err, req, res, next) {
    console.log('errorHandler :', err); 
    res.status(500).json({
        message: err.message, 
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}  // Hide stack trace in production
    })
}

function boomErrorHandler(err, req, res, next) {
    if(err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        next(err);
    }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };