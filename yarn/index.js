const Validator = require('validator');

const isEmail = Validator.isEmail('raphaelthi@yahoo.fr');

console.log(isEmail);