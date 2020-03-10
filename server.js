const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDb = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDb();

const app = express();

//Body parsers middleware
app.use(express.json({extended: false}));

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
} else if (process.env.NODE_ENV === 'production') {
        // Set static folder
        app.use(express.static('client/build'));

        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
}

//Routes
app.use('/api/v1/transactions',require('./routes/transactions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));