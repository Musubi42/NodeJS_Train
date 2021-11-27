const router = require("express").Router();
const User = require("../models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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
});


//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ //Permet de récupérer la data d'un user grâce son userName
            username: req.body.username
        });
        !user && res.status(401).json("Wrong Username"); //Si on ne récupére pas la data c'est que l'user associé à l'userName n'existe pas

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC); //On récupére le mot de passe de l'user, qu'on décrypte avec la pass_sec
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8) //HashedPassword étant un array chelou, il faut le transformer en string pour le comparer avec le mot de passe envoyé
        originalPassword !== req.body.password &&
            res.status(401).json("Wrong Password"); //Si le mot de passe est différent il y'a une erreur

        const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC, {
                expiresIn: "3d"
            }
        );

        //Permet d'exclure password de la réponse HTTP
        const {
            password,
            ...others
        } = user._doc;

        res.status(200).json({
            ...others,
            accessToken
        });

    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router