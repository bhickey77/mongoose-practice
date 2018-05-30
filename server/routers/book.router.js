const express = require('express');
const router = express.Router();

const Book = require('../modules/models/book.schema');

router.get('/', (req, res) => {
    Book.find()
        .then(data => {
            console.log(`Got stuff back from mongo: ${data}`);
            res.send(data);
        })
        .catch(error => {
            console.log(`Error from mongo: ${error}`);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    let bookData = req.body;    
    let newBook = new Book(bookData);
    newBook.save()
        .then((response) =>{
            console.log(`Mongoose saved ${response}`);
        })  
        .catch((error) => {
            console.log(`There was an error: ${error}`);
        });
    res.sendStatus(201);
});

router.delete('/', (req, res) => {
    Book.findByIdAndRemove(req.query._id)
        .then(response => {
            console.log(`item deleted: ${response}`);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(`Error removing book: ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;