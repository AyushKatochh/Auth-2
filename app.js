require('dotenv').config();
const express = require("express");
const app = express();

// npm logger , its a middleware that will handle all the requests
const morgan = require('morgan');

// body-parser parse the body of incoming requests
const bodyParser = require("body-parser")

// Connecting mongodb with mongoose
const  mongoose = require('mongoose');

// request should target the below route
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

//connect database
mongoose.connect('mongodb+srv://ayush:' + process.env.MONGO_ATLAS_PW+ '@cluster0.wpc2n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.Promise = global.Promise;
// dev is the format we want to use for output
app.use(morgan('dev'));
// Making uploads folder public
// Pass request only through upload
app.use('/uploads',express.static('uploads'));

// which type of bodies we want to parse
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    // for handling cors errors
    // * is used to give access to any client
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  
    // Browser will always send options before post request
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
     next();
})
// use() introduces middleware 
// next is actually function
// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);


//Handle each request after passing through middleware
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 400;
    // Forward request error
    next(error);
})

// This middleware handles all types of errors
app.use((error, req, res, next) => {
    // Same status as error 
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})


// Export to server.js
module.exports = app;