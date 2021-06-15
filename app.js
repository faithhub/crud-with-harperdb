const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const server = require('http').createServer(app);



//request handling
app.use(morgan('dev'));

//payload size increase
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//error page handling
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

//header authorization
app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Content-Type: application/json; charset=utf-8')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PATCH, POST, DELETE, GET')
        return res.status(200).json();
    }
})


//service static files.
app.use(express.static(path.join(__dirname, '/harperdb/')));

//PORT LISTENING
server.listen(process.env.PORT)

module.exports = app