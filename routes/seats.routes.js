const express = require('express');
const router = express.Router();
const db = require('../db')
const { v4: uuidv4 } = require('uuid');




router.route('/seats').get((req, res) => {
    res.json(db.seats);
})


router.route('/seats/random').get((req, res) => {
    const randomId = Math.floor(Math.random() * db.seats.length);
    res.json(db.seats[randomId]);
})

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats[req.params.id -1]);
})

router.route('/seats').post((req, res) => {

    const { client, email, day, seat } = req.body;

    const isTaken = db.seats.some(e => e.day === day && e.seat === seat);

    if(isTaken){
        return res.status(409).json({ message: "The slot is already taken..." })
    }

    const id = uuidv4();
    const newSeat = { 
        id, 
        client, 
        email, 
        day, 
        seat 
    };

    db.seats.push(newSeat)
    io.emit('seatsUpdated', db.seats);

    res.json(newSeat);
})

router.route('/seats/:id').put((req, res) => {
    const  id = req.params.id;
    const { author, text } = req.body;

    const seat = db.seats.find(elem => elem.id == id);

    seat.author = author;
    seat.text = text;

    res.json({message: 'OK'});
})

router.route('/seats/:id').delete((req, res) => {
    const id = req.params.id;

    const seat = db.seats.find(elem => elem.id == id);

    db.seats.splice(seat, 1)

    res.json({message: 'OK'})
})

module.exports = router;