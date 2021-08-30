const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); // This is a piece of middleware, this for parsing the body of a request

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
app.get('/api/courses/query/:year/:mounth', (req, res) => {
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


    const {
        error
    } = validateCourse(req.body); // result.error

    if (error) return res.status(400).send(error.details[0].message);


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
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));