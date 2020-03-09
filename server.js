const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDb = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDb();

const app = express();

//Body parsers middleware
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//Routes
app.use('/api/v1/transactions',require('./routes/transactions'));
app.use('/api/v1/auth',require('./routes/auth'));
app.use('/api/v1/user',require('./routes/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));