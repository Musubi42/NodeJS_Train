const express = require('express');
const app = express();

app.use(express.json()); // This is a piece of middleware 

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
    if (!course) res.status(404).send('The course with the gven ID was not find');
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//Je suis un com

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));