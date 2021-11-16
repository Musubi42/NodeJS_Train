const Validator = require('validator');

const email = ['raphaelthi@yahoo.fr', 'de', 'raphae@debugger;fr', 'rapha.fr.fr', 'raphaelthi59@gmail.com'];

console.log(process.argv.slice(2));

process.argv.slice(2).forEach(element => {
    console.log(Validator.isEmail(element));
})