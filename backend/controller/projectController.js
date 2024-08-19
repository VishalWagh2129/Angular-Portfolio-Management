const generateId = require('../utility/common');
const Project = require('../models/projectsModel');


exports.createProject = async (req, res) => {
    try {
        const projectId = await generateId('PRJ');
        const { name, created_by, updated_by,image,description, link, record_status } = req.body;
        const newProject = new Project({
            udid: projectId,
            created_by,
            updated_by,
            record_status,
            name,
            description,
            link,
            image
        });
        await newProject.save();
        res.status(201).json({ success: true, message: 'Project created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error While creating Project', error: error.message });
    }
}

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { updated_by, record_status, name, description,link,image } = req.body;
        const updatedAbout = await Project.findOneAndUpdate(
            { udid: id },
            {
                updated_by,
                updated_date: new Date(),
                record_status,
                name,
                description,
                link,
                image
            },
            { new: true }
        );
        if (!updatedAbout) {
            return res.status(404).json({ error: 'Project data not found' });
        }
        res.status(200).json({ success: true, message: 'Project Updated Successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Project.findOne({udid:id});
        if (!product) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Project.findOneAndDelete({udid:id});
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};