const generateId = require('../utility/common');
const About = require('../models/aboutModel');


exports.createAbout = async (req, res) => {
    try {
        const experienceId = await generateId('ABT');
        const { name, created_by, updated_by,image, designation,description, linkedin, resume, record_status } = req.body;
        const newMessage = new About({
            udid: experienceId,
            created_by,
            updated_by,
            record_status,
            name,
            description,
            designation,
            resume,
            linkedin,
            image
        });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Experience created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error While creating Experience', error: error.message });
    }
}

exports.getAllAbout = async (req, res) => {
    try {
        const messages = await About.find();
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const { updated_by, record_status, name, designation, description, linkedin,image, resume } = req.body;
        const updatedAbout = await About.findOneAndUpdate(
            { udid: id },
            {
                updated_by,
                updated_date: new Date(),
                record_status,
                name,
                description,
                designation,
                linkedin,
                resume,
                image
            },
            { new: true }
        );
        if (!updatedAbout) {
            return res.status(404).json({ error: 'About User data not found' });
        }
        res.status(200).json({ success: true, message: 'About Us Updated Successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};