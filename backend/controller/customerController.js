const generateId = require('../utility/common');
const Contact = require('../models/contactModel');

exports.createMessage = async (req, res) => {
    try {
        const messageId = await generateId('MES');
        const { name, email, message } = req.body;
        const newMessage = new Contact({
            udid: messageId,
            record_status: 'ACTIVE',
            name,
            email,
            message
        });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message Sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error While Sending Message', error: error.message});
    }
}

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Contact.find();
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};