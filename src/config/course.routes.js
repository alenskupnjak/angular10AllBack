const express = require('express');
const fileController = require('../api/controllers/course.file.ctrl');
const baseController = require('../api/controllers/course.base.ctrl');
const passport = require('passport');

const router = express.Router();

// **********************************************************************************

// INVOICES
router.get('/courses', fileController.findAll);
router.get('/courses/:id', fileController.findOne);
router.post('/courses', fileController.create);
router.delete('/courses/:id', fileController.deleteOne);
router.put('/courses/:id', fileController.updateOne);


router.get('/api/courses', baseController.getAllCourses);
router.get('/api/courses/:id', baseController.getCourseById);
router.get('/api/lessons/:id', baseController.getAllLessons);




// Aplikacija COURSE
module.exports = router;
