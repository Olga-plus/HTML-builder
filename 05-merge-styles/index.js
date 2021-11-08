const fs = require('fs');
// const { findSourceMap } = require('module');
const path = require('path');

const fsPromises = fs.promises;
const nameFileNew = path.join(__dirname, 'project-dist', 'bundle.css')
const writeStream = fs.createWriteStream(nameFileNew);
// const nameFile = path.join('05-merge-styles', 'project-dist', 'bundle.css');
const adress = path.join(__dirname, 'styles');

// fs.readdir(adress, (err, files) => {
//     if (err) throw err;

//     files.forEach( index => {
//     // let extName = path.extname(el);
//     if (index === files.length - 1) {
//         readStrim.pipe(writeStream)
//     }

//     if (extName === '.css') {
//         let way = path.join(adress, file);
//         console.log(way);
//  }
// })
// })
fs.stat(adress, function(err) {
        if (!err) {

    }

})


async function readStyles() {
    const files = await fsPromises.readdir(adress, {withFileTypes: true}); // получаем массив эл из папки
    console.log(files);
    for (let file of files) { // идем по массиву
        console.log(file.name);
        if(path.extname(file.name) === '.css' && file.isFile()){ // проверяем на соответствие
            let way = path.join(adress, file.name);
            let readableStream = fs.createReadStream(way, 'utf-8');
            readableStream.pipe(writeStream);
        }
    }
}
readStyles();

    // fs.readdir(adress, (err, files) => {
    //     if (err) throw err;
    
    //     console.log(files.length, 'BBBBB');
    //     for (let file of files) {
    //     let extName = path.extname(file);
    //     // console.log(extName);
    //     if (extName === '.css') {
    //         let way = path.join(adress, file);
    //         console.log(way);
    //         let readStream = createReadStream(way); 
    //         readStream.on('data', (data) => {
    //             res.write(data);
    //         });
    //  }
    // }
    // })







// fs.readdir(adress, (err, files) => {
//     if (err) throw err;

//     console.log(files.length, 'BBBBB');
//     for (let file of files) {
//     let extName = path.extname(file);
//     // console.log(extName);
//     if (extName === '.css') {
//         let way = path.join(__dirname, 'styles', file);
//         console.log(way);
//         fs.readFile(way, (err, data) => {
//     if (err) throw err;
//     let result = data;
//     fs.writeFile(nameFileNew, result, err => {
//         if (err) throw err;
//         console.log('done');
//     })
// })
//  }
// }
// })





// function fileHandler(){
//     fs.open(nameFile , 'w', (err) => {
//         if(err) throw err;
//         console.log('File created');
//     });
// }
// fileHandler();

// fs.readdir(adress, (err, files) => {
//     if (err) throw err;

//     console.log(files.length, 'BBBBB');
//     for (let file of files) {
//     let extName = path.extname(file);
//     // console.log(extName);
//     if (extName === '.css') {
//         console.log(adress + '/' + file);
//         fs.readFile(adress + '/' + file, (err, data) => {
//     if (err) throw err;
//     let result = data;
//     fs.writeFile(nameFileNew, data, err => {
//         if (err) throw err;
//         console.log('done');
//     })

// })

//     }
//     }
//     })




// fs.readdir(adress, (err, files) => {
//     if (err) throw err;

//     console.log(files.length, 'BBBBB');
//     for (let file of files) {
//     let extName = path.extname(file);
//     // console.log(extName);
//     if (extName === '.css') {
//         console.log(adress + '/' + file);
//  fsPromises.readFile(adress + '/' + file).then(function(){
//     if (err) throw err;
//     let result = data;
//     fs.writeFile(nameFileNew, result, err => {
//         if (err) throw err;
//         console.log('done');
//     })

// }).catch(function() {
//     console.log('failed to create directory');
// });
//  }
// }
// })