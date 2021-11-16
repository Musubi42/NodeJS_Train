const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error(err));


const courseSchema = new mongoose.Schema({
    name: String, 
    author: String, 
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

// This is a class
const Course = mongoose.model('Course', courseSchema);

async function exerciceOne() {
    return await Course
    .find({ isPublished: true , tags: 'frontend' })
    .sort({ price: 1})
    .select({ name: 1, author: 1 });
}

async function exerciceTwo() {
    return await Course
    .find({ isPublished: true , tags: 'frontend', tags: 'backend' })
    .sort({ price: 1 })
    .select({ author: 1, price: 1 });
}

async function exerciceThree() {
    return await Course
    .find({ isPublished: true })
    .or([
        {
            price: { $gte: 15 }
        },
        {
            name: { $in: 'Course' }
        }
    ])
    .select({ author: 1, price: 1 });
}

async function run() {
    const courses = await exerciceThree();
    console.log(courses);
}

run();

async function updateCourse(id) {
    const result = await Course.update({ _id: id }, { 
        $set: { 
            author: 'Oim',
            isPublished: false
        }
    });
    console.log(result);
}


// updateCourse('5a6900fff467be65019a9001');

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

removeCourse('5a6900fff467be65019a9001');