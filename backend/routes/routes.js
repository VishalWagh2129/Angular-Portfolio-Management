// routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const messageController = require('../controller/customerController');
const aboutController = require('../controller/aboutController');
const projectController = require('../controller/projectController');

router.post('/admin-signup', adminController.adminSignup);
router.post('/admin-login', adminController.adminLogin);
router.get('/getAdminDetails/:id', adminController.getAdminDetails);
router.put('/updateAdmin/:id', adminController.updateAdmin);

router.post('/newMessage', messageController.createMessage);
router.get('/getAllMessages', messageController.getAllMessages);

router.post('/createAbout', aboutController.createAbout);
router.get('/getAbout', aboutController.getAllAbout);
router.put('/updateAbout/:id', aboutController.updateAbout);

router.post('/createProject', projectController.createProject);
router.get('/getAllProjects', projectController.getAllProjects);
router.put('/updateProject/:id', projectController.updateProject);
router.delete('/deleteProject/:id', projectController.deleteProject);
router.get('/getProjectById/:id', projectController.getProjectById);



module.exports = router;
