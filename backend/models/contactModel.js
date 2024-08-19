const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    udid: { type: String, required: true, unique: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, default: 'ACTIVE' },
    email: { type: String, required: true },
    name: { type: String, required: true },
    message: { type: String, required: true }
}, { versionKey: false });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
