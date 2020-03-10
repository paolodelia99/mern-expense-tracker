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
} else if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Routing
app.use('/api/v1/auth',require('./routes/auth'));
app.use('/api/v1/user',require('./routes/user'));
app.use('/api/v1/profile',require('./routes/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));