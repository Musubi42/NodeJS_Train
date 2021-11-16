const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error(err));


const courseSchema = new mongoose.Schema({
    name: String, 
    author: String, 
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean 
});

// This is a class
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Oim',
        tags: ['Node', 'Future', 'Dev'],
        isPublished: false
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

getCourses();