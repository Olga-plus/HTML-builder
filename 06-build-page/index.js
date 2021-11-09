const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const adresstoCopyAssets = path.join(__dirname, 'assets');

const nameDirNew = path.join(__dirname, 'project-dist')
const nameFileNew = path.join(__dirname, 'project-dist', 'index.html')
const writeStream = fs.createWriteStream(nameFileNew);

const createDir = fs.mkdir(nameDirNew,  {recursive: true, force: true},(err =>{
    if (err) throw err;
}));


async function readTemplate() {
   let template = await fsPromises.readFile(path.join(__dirname, 'template.html'), {encoding: 'utf-8'});
   let component = /\{\{(.*?)\}\}/g;
   let listComponent = template.match(component);
//    console.log(listComponent);
//    const headerComp = await fsPromises.readFile(path.join(__dirname, 'components', 'header.html'), {encoding: 'utf-8'});
//    const articlesComp = await fsPromises.readFile(path.join(__dirname, 'components', 'articles.html'), {encoding: 'utf-8'});
//    const footerComp = await fsPromises.readFile(path.join(__dirname, 'components', 'footer.html'), {encoding: 'utf-8'});
//    console.log(headerComp);
let rez = template;

   for (let comp of listComponent) {
       comp = comp.slice(2, (comp.length-2))
    //    console.log(comp);
    let way = path.join(__dirname, 'components', `${comp}.html`)
    const coText = await fsPromises.readFile(way, {encoding: 'utf-8'})
    // console.log(coText);
    
    rez = rez.replace(`{{${comp}}}`, `${coText}`) 
       console.log(rez,'--------------------------------');
      
   }
   writeStream .write(rez);

}

readTemplate();


const nameFileNewCss = path.join(__dirname, 'project-dist', 'style.css')
const writeStreamCss = fs.createWriteStream(nameFileNewCss);

const adressCss = path.join(__dirname, 'styles');


async function readStyles() {
    const files = await fsPromises.readdir(adressCss, {withFileTypes: true}); // получаем массив эл из папки
    // console.log(files);
    for (let file of files) { // идем по массиву
        // console.log(file.name);
        if(path.extname(file.name) === '.css' && file.isFile()){ // проверяем на соответствие
            let way = path.join(adressCss, file.name);
            let readableStream = fs.createReadStream(way, 'utf-8');
            readableStream.pipe(writeStreamCss);
        }
    }

}
readStyles();

const adressAssets = path.join(nameDirNew, 'assets');
const createAssetsDir = fs.mkdir(adressAssets,  {recursive: true, force: true},(err =>{ // создали папку assets in project-dist
    if (err) throw err;
}));


let readFrom = path.join(__dirname, 'assets');
let wayTo = path.join(__dirname, 'project-dist', 'assets');
 
async function copyAssets(way, copyTo) {
    const dirAssets = await fsPromises.readdir(way, {withFileTypes: true}); // получаем массив эл из папки
    // console.log(dirAssets);
    for (let file of dirAssets) {
        if(file.isDirectory()){
           let copyDir = await fsPromises.mkdir(path.join(copyTo, file.name), {recursive: true, force: true});
            // console.log('Папка: ' + file.name);
            copyAssets(path.join(way, file.name), path.join(copyTo, file.name)); // продолжаем рекурсию
         }else{
            // console.log('Файл: ' + path.join(way, file.name));
            let wayFile = path.join(copyTo, file.name);
            const writeStream = fs.createWriteStream(wayFile);

         }
    }
}

copyAssets(readFrom, wayTo) 