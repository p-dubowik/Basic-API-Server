const express = require('express');
const cors = require('cors');
const db = require('./db')



const app = express();

app.use(cors());

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);


app.use((req, res) => {
    res.status(404).json({message: '404 not found...'});
});






app.listen(8000, () => {
    console.log('server running on port: 8000');
})