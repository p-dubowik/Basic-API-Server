const express = require('express');
const router = express.Router();
const db = require('../db')
const { v4: uuidv4 } = require('uuid');




router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
})


router.route('/testimonials/random').get((req, res) => {
    const randomId = Math.floor(Math.random() * db.testimonials.length);
    res.json(db.testimonials[randomId]);
})

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials[req.params.id -1]);
})

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const id = uuidv4();
    const newTestimonial = { id, author, text };
    db.testimonials.push(newTestimonial)
    res.json({message: 'OK'});
})

router.route('/testimonials/:id').put((req, res) => {
    const  id = req.params.id;
    const { author, text } = req.body;

    const testimonial = db.testimonials.find(elem => elem.id == id);

    testimonial.author = author;
    testimonial.text = text;

    res.json({message: 'OK'});
})

router.route('/testimonials/:id').delete((req, res) => {
    const id = req.params.id;

    const testimonial = db.testimonials.find(elem => elem.id == id);

    db.testimonials.splice(testimonial, 1)

    res.json({message: 'OK'})
})

module.exports = router;