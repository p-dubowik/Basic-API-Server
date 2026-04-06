const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const con = await Concert.aggregate([{ $sample: { size: 1 }}]);
        if(con) res.json(con);
        else res.status(404).json({ message: 'Not found...'})
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if(!con) res.status(404).json({ message: 'Not found...' });
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.new = async (req, res) => {

    try{
        const { performer, genre, day, price, image } = req.body;
        const newConcert = await new Concert({ 
            performer, 
            genre, 
            day, 
            price,
            image
        });
        await newConcert.save();
        
        res.json(newConcert);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { performer, genre, day, price, image } = req.body;

        const con = Concert.findById(req.params.id);
        if(con){
            Concert.updateOne({ _id: req.params.id }, {performer: performer, genre: genre, day: day, price: price, image: image})
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
        const con = await Concert.findById(req.params.id);
        if(!con) res.status(404).json({ message: 'Not Found...' });
        else {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};
