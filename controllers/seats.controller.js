const Seat = require('../models/seats.model');
const sanitize = require('mongo-sanitize');




exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getRandom = async (req, res) => {
    try {
        const seat = await Seat.aggregate([{ $sample: { size: 1 }}]);
        if(seat) res.json(seat);
        else res.status(404).json({ message: 'Not found...'})
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found...' });
        else res.json(seat);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.new = async (req, res) => {

    try{
        const { client, email, day, seat } = req.body;

        //Check if seat is taken
        const exists = await Seat.findOne({day, seat});
        if(exists){
            return res.status(409).json({ message: 'This seat is taken' });
        }

        const newSeat = await new Seat({ 
            client, 
            email, 
            day, 
            seat 
        });
        await newSeat.save();

        const updatedSeats = await Seat.find();
        
        req.io.emit('seatsUpdated', updatedSeats);
        res.json(newSeat);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { client, email, day, seat } = sanitize(req.body);

        const seatDB = Seat.findById(req.params.id);

        if(seatDB){
            await Seat.updateOne(
                { _id: req.params.id }, 
                { client: client, email: email, day: day, seat: seat }
            );
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not Found...' });
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not Found...' });
        else {
            await Seat.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};