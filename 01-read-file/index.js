
const fs = require('fs');
const path = require('path');
const adress = path.join('01-read-file', '/text.txt');
// const adressNew = path.join('01-read-file', '/new-text.txt')
// ReadStream


// var stream = new fs.ReadStream(adress, {encoding: 'utf-8'});
// stream.on('readable', function() {
//     var data = stream.read();
//     // console.log(data);
// });

// stream.on('end', function() {
//     console.log('the end');
// });

// stream.on('error', function(err) {
//    if (err.code == 'ENDENT') {
//        console.log('file is not defined')
//    } else {
//        console.error(err);
//    }
// });

const readStream = new fs.ReadStream(adress, {encoding: 'utf-8'});
// const writeStream = fs.createWriteStream(adressNew);

readStream.on('data', (chunk) => {
    console.log(chunk);
    process.stdout.write(chunk);
});

