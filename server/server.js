const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// connect to mongoDB
const DATABASE_NAME = 'library';
const DATABASE_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
mongoose.connect(DATABASE_URL);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose is connected to ${DATABASE_URL}!`);
});

mongoose.connection.on('error', () => {
    console.log(`Mongoose connection error: ${error}`);
});

const bookRouter = require('./routers/book.router');
app.use('/book', bookRouter);

app.listen(port, () => {
    console.log(`listening on port: ${port}`);  
});

