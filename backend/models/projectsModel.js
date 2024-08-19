const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
    udid: { type: String, required: true, unique: true },
    created_by: { type: String, default: null },
    updated_by: { type: String, default: null },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now },
    record_status: { type: String, default: 'ACTIVE' },
    description: { type: String, required: true },
    name: { type: String, required: true },
    link: { type: String, required: true },
    image: { type: String, required: true }
}, { versionKey: false });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
