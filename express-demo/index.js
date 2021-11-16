const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.use(express.json()); // This is a piece of middleware, this for parsing the body of a request

app.use(express.urlencoded({
    extended: true
})); //

app.use(express.static('public')); // Static content are serve from the route of the site
// To access ./public/readme.txt, in the browser query /readme.txt

app.use(logger);

app.use(helmet());

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
    flags: 'a'
});

// Setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}));

app.use(morgan('tiny'));

app.use(function (req, res, next) {
    console.log('Authentificating...');
    next();
});

const courses = [{
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    },
]

app.get('/', (req, res) => {
    res.send('Hello Nodemon');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:courseID', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.courseID));
    if (!course) return res.status(404).send('The course with the given ID was not find');
    res.send(course);
});


app.get('/api/courses/:year/:mounth', (req, res) => {
    res.send(req.params.year + req.params.mounth);
});


// Read query paramaters
app.get('/api/courses/query/', (req, res) => {
    res.send(req.query);
});


// POST request
app.post('/api/courses', (req, res) => {
    const {
        error
    } = validateCourse(req.body); // result.error

    if (error) return res.status(400).send(error.details[0].message);


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// Nerver never trust the user


app.put('/api/courses/:courseID', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.courseID));
    if (!course) return res.status(404).send('The course with the given ID was not find');


    /*   const {
          error
      } = validateCourse(req.body);  */ // result.error

    // if (error) return res.status(400).send(error.details[0].message);


    course.name = req.body.name;
    res.send(course);
});

// delete
app.delete('/api/courses/:courseID', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.courseID));
    if (!course) return res.status(404).send('The course with the given ID was not find');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})


function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
};

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}`));