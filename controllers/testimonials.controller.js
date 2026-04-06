const Testimonial = require('../models/testimonials.model');


exports.getAll = async (req, res) => {
    try {
        res.json(await Testimonial.find());
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getRandom = async (req, res) => {
    try {
        const tes = await Testimonial.aggregate([{ $sample: { size: 1 }}]);
        if(tes) res.json(tes);
        else res.status(404).json({ message: 'Not found...'})
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const tes = await Testimonial.findById(req.params.id);
        if(!tes) res.status(404).json({ message: 'Not found...' });
        else res.json(tes);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.new = async (req, res) => {

    try{
        const { author, text } = req.body;
        const newTestimonial = await new Testimonial({ 
            author, 
            text
        });
        await newTestimonial.save();
        
        res.json(newTestimonial);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { author, text } = req.body;

        const tes = await Testimonial.findById(req.params.id);
        if(tes){
            await Testimonial.updateOne({ _id: req.params.id }, {author: author, text: text})
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
        const tes = await Testimonial.findById(req.params.id);
        if(!tes) res.status(404).json({ message: 'Not Found...' });
        else {
            await Testimonial.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};