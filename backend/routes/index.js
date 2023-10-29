const express = require('express');
const Book = require('../models/book')

const router = express.Router();

// creating the entry of book in db
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
        return res.status(500).send({message: error.message})
    }
})

// get All the books db
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// get one book from db by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if(req.body.title !== undefined){
            book.title = req.body.title;
        }
        if(req.body.author !== undefined){
            book.author = req.body.author
        }
        if(req.body.year !== undefined){
            book.year = req.body.year;
        }
        const updatedBook = await book.save();
        return res.status(200).json({updatedBook})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).send({message: "Book updated successfully"})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

module.exports = router;