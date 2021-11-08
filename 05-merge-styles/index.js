const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const nameFileNew = path.join(__dirname, 'project-dist', 'bundle.css')
const writeStream = fs.createWriteStream(nameFileNew);

const adress = path.join(__dirname, 'styles');


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