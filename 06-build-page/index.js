const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const nameDirNew = path.join(__dirname, 'project-dist')
const nameFileNew = path.join(__dirname, 'project-dist', 'index.html')
const writeStream = fs.createWriteStream(nameFileNew);

const createDir = fs.mkdir(nameDirNew,  {recursive: true, force: true},(err =>{
    if (err) throw err;
}));


async function readTemplate() {
   const template = await fsPromises.readFile(path.join(__dirname, 'template.html'), {encoding: 'utf-8'});
   let component = /\{\{(.*?)\}\}/g;
   let listComponent = template.match(component);
   console.log(listComponent);
//    const headerComp = await fsPromises.readFile(path.join(__dirname, 'components', 'header.html'), {encoding: 'utf-8'});
//    const articlesComp = await fsPromises.readFile(path.join(__dirname, 'components', 'articles.html'), {encoding: 'utf-8'});
//    const footerComp = await fsPromises.readFile(path.join(__dirname, 'components', 'footer.html'), {encoding: 'utf-8'});
//    console.log(headerComp);

   for (let comp of listComponent) {
       comp = comp.slice(2, (comp.length-2))
       console.log(comp);
       let way = path.join(__dirname, 'components', `${comp}.html`)
       let readableStream = fs.createReadStream(way, 'utf-8');
       readableStream.pipe(writeStream);
   }
}

readTemplate();


const nameFileNewCss = path.join(__dirname, 'project-dist', 'style.css')
const writeStreamCss = fs.createWriteStream(nameFileNewCss);

const adressCss = path.join(__dirname, 'styles');


async function readStyles() {
    const files = await fsPromises.readdir(adressCss, {withFileTypes: true}); // получаем массив эл из папки
    console.log(files);
    for (let file of files) { // идем по массиву
        console.log(file.name);
        if(path.extname(file.name) === '.css' && file.isFile()){ // проверяем на соответствие
            let way = path.join(adressCss, file.name);
            let readableStream = fs.createReadStream(way, 'utf-8');
            readableStream.pipe(writeStreamCss);
        }
    }
}
readStyles();