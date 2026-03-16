const express = require('express');
const router = express.Router();
const db = require('../db')
const { v4: uuidv4 } = require('uuid');




router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
})


router.route('/concerts/random').get((req, res) => {
    const randomId = Math.floor(Math.random() * db.concerts.length);
    res.json(db.concerts[randomId]);
})

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts[req.params.id -1]);
})

router.route('/concerts').post((req, res) => {
    const { author, text } = req.body;
    const id = uuidv4();
    const newConcert = { id, author, text };
    db.concerts.push(newConcert)
    res.json({message: 'OK'});
})

router.route('/concerts/:id').put((req, res) => {
    const  id = req.params.id;
    const { author, text } = req.body;

    const concert = db.concerts.find(elem => elem.id == id);

    concert.author = author;
    concert.text = text;

    res.json({message: 'OK'});
})

router.route('/concerts/:id').delete((req, res) => {
    const id = req.params.id;

    const concert = db.concerts.find(elem => elem.id == id);

    db.concerts.splice(concert, 1)

    res.json({message: 'OK'})
})

module.exports = router;