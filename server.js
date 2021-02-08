const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());

dotenv.config({path: './config/config.env'});

const transactions = require('./routes/transactions');

app.use('/api/v1/transactions', transactions);


// if (process.env.NODE_ENV === 'development'){

// }
// app.use(morgan('dev'));

app.get('/', (req, res) => res.send("hello"));

const PORT = process.env.PORT || 5000;

app.listen(PORT,
    console.log(`server running in '${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));