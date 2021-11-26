const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoots = require('./users');

dotenv.config();

mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then(() => console.log("Success"))
    .catch((err) => console.log("Error: " + err));

app.use(express.json());
app.use('/api/users', userRoots);


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend Server is running");
})