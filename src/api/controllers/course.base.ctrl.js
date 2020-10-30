const COURSES = require('../models/database/course.base');
const LESSONS = require('../models/database/lesson.base');
const colors = require('colors');

exports.getAllCourses = (req, res) => {
  console.log('Object.values(COURSES)', colors.green(Object.values(COURSES)));
  let podatak = Object.values(COURSES)[0];
  // console.log(podatak);
  let podatakArray = Object.values(podatak);
  res.status(200).json({
    payload: podatakArray,
  });
};

exports.getAllLessons = (req, res) => {
  console.log('Object.values(LESSONS)', colors.blue(Object.values(LESSONS)));
  const courseId = String(req.params['id']);
  console.log(courseId);

  let podatak = Object.values(LESSONS)[0];
  console.log(podatak);
  let podatakArray = Object.values(podatak);

  let trazim = podatakArray.filter((data) => {
    console.log(data.id,courseId);
    
    return data.courseId.toString() === courseId;
  });
  console.log(trazim);

  console.log(colors.magenta(podatakArray));
  res.status(200).json({
    // payload: podatakArray,
    trazim,
  });
};

// Pronadi lesson pkeko ID
exports.getCourseById = (req, res) => {
  try {
    const courseId = String(req.params['id']);
    console.log(courseId, typeof courseId);

    let kurs = Object.values(COURSES)[0];

    // Iz objekta ga pretvaram u polje
    podatak = Object.values(kurs).find((e) => {
      return e.id.toString() === courseId;
    });

    res.status(200).json({
      podatak: podatak,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.findCourseById = (courseId) => {
  return COURSES[courseId];
};

exports.findLessonsForCourse = (courseId) => {
  return Object.values(LESSONS).filter((lesson) => lesson.courseId == courseId);
};

exports.authenticate = (email, password) => {
  const user = Object.values(USERS).find((user) => user.email === email);

  if (user && user.password == password) {
    return user;
  } else {
    return undefined;
  }
};

exports.USERS = {
  1: {
    id: 1,
    email: 'test@angular-university.io',
    password: 'test',
    pictureUrl:
      'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
  },
};
