const express = require('express');
const Book = require('../models/book')

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if(!req.body.title || !req.body.author || !req.body.year){
            return res.status(400).send({
                message: "Send all the required fields"
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            year: req.body.year
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

export default router;