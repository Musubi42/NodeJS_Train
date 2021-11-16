// import Tesseract from 'tesseract.js';
const Tesseract = require('tesseract.js');
const fs = require('fs');

// fs.readFile('/home/musubi42/Downloads/IMG_20211017_192939.jpg', 'jpg', (err, data) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log(data)
// })


Tesseract.recognize(
    'https://www.stjohns.edu/sites/default/files/2020-05/Legal%20Englis%201600%20x%20900.jpg',
    'eng', {
        logger: m => console.log(m)
    }
).then(({
    data: {
        text
    }
}) => {
    console.log(text);
})