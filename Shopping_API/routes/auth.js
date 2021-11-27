const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");

//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const SavedUser = await newUser.save();
        res.status(201).json(SavedUser);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router