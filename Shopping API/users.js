const router = require("express").Router();

router.get('/userstest', (req, res) => {
    res.send("User test is succesfull");
});


router.post('/usersposttest', (req, res) => {
    const username = req.body.username;
    res.send(username);
    console.log(username);
});

module.exports = router