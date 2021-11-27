const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const userRoots = require('./users');
const authRoots = require('./routes/auth');

dotenv.config();

mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then(() => console.log("Success"))
    .catch((err) => console.log("Error: " + err));

app.use(express.json());
// app.use('/api/users', userRoots);
app.use('/api/auth', authRoots);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend Server is running");
})