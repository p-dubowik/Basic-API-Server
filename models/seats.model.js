const mongoose = require('mongoose');

const seatSchema = mongoose.Schema({
    day: { type: Number, required: true, min: 1, max: 3},
    seat: { type: Number, required: true, min: 1},
    client: { type: String, required: true },
    email: { type: String, required: true }
});

seatSchema.index({ day: 1, seat: 1}, { unique: true });

module.exports = mongoose.model('Seat', seatSchema);