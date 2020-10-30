const colors = require('colors');
const path = require('path');

const Joi = require('joi');
const fs = require('fs');

// ************************************************
// Pronadi sve zapise
exports.findOne = (req, res, next) => {
  const databasePath = path.resolve('src/api/models/database', 'course.json');
  const jsonData = JSON.parse(fs.readFileSync(databasePath, 'utf-8'));
 
  //check if the course exist or not
  const pronadiJednog = jsonData.find((course) => {
    return course.id === req.params.id;
  });
  
  if (!pronadiJednog) {
    return res.status(409).json({ error: true, msg: 'Course ne postoji exist' });
  }

  return res.status(200).json({
    pronadiJednog: pronadiJednog,
  });
};


// ************************************************
// Obrisi jedan zapis
exports.deleteOne = (req, res, next) => {
  const databasePath = path.resolve('src/api/models/database', 'course.json');
  const jsonData = JSON.parse(fs.readFileSync(databasePath, 'utf-8'));
 
  //check if the course exist or not
  const pronadiJednog = jsonData.find((course) => {
    return course.id === req.params.id;
  });
  
  if (!pronadiJednog) {
    return res.status(409).json({ error: true, msg: 'Course ne postoji exist' });
  }

  //filter the userdata to remove it
  const filterCourse = jsonData.filter( course => course.id !== req.params.id )
  const stringifyData = JSON.stringify(filterCourse);
  
  //save the filtered data
  fs.writeFileSync( path.resolve('src/api/models/database', 'course.json'), stringifyData);

  return res.status(200).json({
    Status: 'Obrisan',
    Zapis: pronadiJednog,
  });
};


/* Update - Patch method */
// Pronadi sve zapise
exports.updateOne = (req, res, next) => {
  const databasePath = path.resolve('src/api/models/database', 'course.json');
  const jsonData = JSON.parse(fs.readFileSync(databasePath, 'utf-8'));
 
  //get the new user data from post request
  let courseData = req.body;
  courseData.id = req.params.id
  
  //check if the course exist or not
  const course = jsonData.find((course) => {
    return course.id === req.params.id;
  });
  
  if (!course) {
    return res.status(409).json({ error: true, msg: 'Course ne postoji exist' });
  }

  //filter the userdata to remove it
  const filterCourse = jsonData.filter( course => course.id !== req.params.id )

  //push the updated data
  filterCourse.push(courseData)

  const stringifyData = JSON.stringify(filterCourse);
  
  //save the filtered data
  fs.writeFileSync( path.resolve('src/api/models/database', 'course.json'), stringifyData);

  return res.status(200).json({
    updatedfield: filterCourse,
  });
};


// ************************************************
// Pronadi sve zapise
exports.findAll  = (req, res, next) => {
  const databasePath = path.resolve('src/api/models/database', 'course.json');
  const jsonData = fs.readFileSync(databasePath, 'utf-8');
  return res.status(200).json({
    jsonData: JSON.parse(jsonData),
  });
};


// *************************************************
// Kreiranje COURSE
exports.create = (req, res, next) => {
  //get the existing user data
  const jsonCourse = fs.readFileSync(
    path.resolve('src/api/models/database', 'course.json'),
    'utf-8'
  );
  const jsonCoursedata = JSON.parse(jsonCourse);

  //get the new user data from post request
  const courseData = req.body;
  courseData.id = String(Date.now())
    
  //check if the userData fields are missing
  if (courseData.name == null || courseData.profession == null || courseData.password == null) {
      return res.status(401).json({ error: true, msg: 'User data missing' });
  }

  //check if the username exist or not
  const findExist = jsonCoursedata.find((course) => {
    return course.name === courseData.name;
  });
  
  if (findExist) {
    return res.status(409).json({ error: true, msg: 'Course already exist' });
  }

  //append the user data
  jsonCoursedata.push(courseData);

  const stringifyData = JSON.stringify(jsonCoursedata);
  
  //save the filtered data
  fs.writeFileSync( path.resolve('src/api/models/database', 'course.json'), stringifyData);

  return res.status(200).json({
    create: 'Create Course',
    jsonCourse: jsonCoursedata,
    courseData: courseData,
  });
};



