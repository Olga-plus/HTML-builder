const fs = require('fs');
const path = require('path');
const adress = path.join('03-files-in-folder', '/secret-folder');

fs.readdir(adress, (err, files) => {
    if (err) throw err;
    // console.log(files);
    for (let file of files) {
        fs.stat(adress + '/' + file, (err, stats) => {
            if(err) throw err;

            if (stats.isFile()){
                let extName = path.extname(file);
                let nameFile = file.toString().split()
                let name = nameFile[0].split('.')[0];
                let sizeFile = `${stats.size} b`;
                console.log( `File name: ${name}; extension: ${extName}; size: ${sizeFile}` ); 

            }
        })
    }
})





// {withFileTypes: true}

// fs.readdir(adress, (err, data) => {
// 	if(err) {throw err}
    
//   	console.log(data)
// })

// fs.stat(directoryPath, (err, stats) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     console.log(stats.isFile()) //true
//     stats.forEach(item => console.log(item) )
//     stats.isDirectory() //false
//     stats.isSymbolicLink() //false
//     stats.size //1024000 //= 1MB
//   })

// const directoryPath = path.join(__dirname, 'Documents');
//passsing directoryPath and callback function
// const a = fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         if (file.isFile()){
//            console.log(file);  
//         }
        
//     });

// });

// console.log('a',a);


// {withFileTypes: true}

// fs.readdir(adress, (err, data) => {
// 	if(err) {throw err}
    
//   	console.log(data)
// })