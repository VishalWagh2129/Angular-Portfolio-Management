const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutSchema = new Schema({
    udid: { type: String, required: true, unique: true },
    created_by: { type: String, default: null },
    updated_by: { type: String, default: null },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, default: 'ACTIVE' },
    designation: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String, required: true },
    linkedin: { type: String, required: true },
    resume: { type: String, required: true },
    image: { type: String, required: true }
}, { versionKey: false });

const About = mongoose.model('About', aboutSchema);

module.exports = About;
