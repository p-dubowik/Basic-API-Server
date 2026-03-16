const express = require('express');
const { v4: uuidv4 } = require('uuid');



const app = express();

app.use(express.urlencoded({extended: false}));

app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Jane Doe', text: 'Lorem Ipsum.' },
  { id: 4, author: 'Jack Doe', text: 'Dolor.' },
];

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/random', (req, res) => {
    const randomId = Math.floor(Math.random() * db.length);
    res.json(db[randomId]);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db[req.params.id -1]);
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    const id = uuidv4();
    const newTestimonial = { id, author, text };
    db.push(newTestimonial)
    res.json({message: 'OK'});
})

app.put('/testimonials/:id', (req, res) => {
    const  id = req.params.id;
    const { author, text } = req.body;

    const testimonial = db.find(elem => elem.id == id);

    testimonial.author = author;
    testimonial.text = text;

    res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
    const id = req.params.id;

    const testimonial = db.find(elem => elem.id == id);

    db.splice(testimonial, 1)

    res.json({message: 'OK'})
})

app.use((req, res) => {
    res.status(404).json({message: '404 not found...'});
});






app.listen(8000, () => {
    console.log('server running on port: 8000');
})