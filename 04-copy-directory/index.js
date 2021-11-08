
const fs = require('fs');
const path = require('path');
const opendir = require('fs/promises');
let util = require('util');

const adressCopy = path.join(__dirname, 'files-copy');
const adress = path.join(__dirname, 'files');
const fsPromises = fs.promises;

fs.stat(adressCopy, function(err) {
        if (!err) {
            console.log('The directory already exists');
    fs.readdir(adress, (err, files) => {
        if (err) throw err;
        console.log(files.length, 'BBBBB');
        getAllFiles(adressCopy);
        copyFun(adress);
        })
}
        else if (err.code === 'ENOENT') {
         console.log('create folder');

        fsPromises.mkdir(adressCopy).then(function() {
            console.log('Directory created successfully');

            copyFun (adress);
    
        })
        .catch(function() {
            console.log('failed to create directory');
        });
    }
});

function getAllFiles(adressCopy) {
    fs.readdir(adressCopy, {recursive: true, force: true},(err, files) => {
        if (err) throw err;
        for (let file of files) {
            fs.stat(adressCopy + '/' + file, (err, stats) => {
                if (err) throw err;

                if (!stats.isDirectory()){
                        console.log(fs.unlink(adressCopy + '/' + file, (err) => {
                        if (err) throw err;}));
                }

                if (stats.isDirectory()){
                    getAllFiles(adressCopy + '/' + file)
                    console.log(fs.rmdir(adressCopy + '/' + file, (err) => {
                    if (err) throw err;})); }

                
                    // getAllFiles(adressCopy + '/' + file)
                
            })
        }
    })
}

function copyFun(adress) {
    fs.readdir(adress, (err, files) => {
        if (err) throw err;
        console.log(files.length, 'COPY FILES');
        for (let file of files) {
            fs.stat(adress + '/' + file, (err, stats) => {
                if(err) throw err;
                let way =  path.join(adressCopy + '/' + file);
                let wayCopy = path.join(adress + '/' + file)
                if (!stats.isDirectory()) {
                    fs.copyFile(wayCopy, way, err => {
                     if(err) throw err;  
                     console.log('File copied successfully');});
                    } else if (stats.isDirectory()) {
                       
                        fs.stat(way, function(err) {
                            if (!err) {
                                       console.log('CREATE the directory');
                                fs.readdir(wayCopy, (err, files) => {
                                    if (err) throw err;
                                    console.log(files.length, 'BBBBB');
                                    getAllFiles(way);
                                    copyFun(wayCopy);
                                    })
                            }
                                    else if (err.code === 'ENOENT') {
                                     console.log('create folder');
                                    // fs.mkdir(way, err => { //create folder
                                    //     if (err) throw err;
                                    //     console.log('jjjj', way + '/' + file)
                                    //     // copyFun(wayCopy  + '/' + file );
                                    // });
                                    fsPromises.mkdir(way).then(function() {
                                        console.log(' successfully');
                            
                                        copyFun (wayCopy);
                                
                                    })
                                    .catch(function() {
                                        console.log('failed to create directory');
                                    });
                                }
                        })
                    }
            })
        }
    })}



















// fs.readdir(adress, (err, files) => {
//     if (err) throw err;
//     // console.log(files);
//     for (let file of files) {
//         fs.stat(adress + '/' + file, (err, stats) => {
//             if(err) throw err;
//             let way =  path.join(adressCopy + '/' + file);
//             let wayCopy = path.join(adress + '/' + file)
//             // console.log(way);
//                 fs.copyFile(wayCopy, way, COPYFILE_EXCL, err => {
//                  if(err) throw err; // не удалось скопировать файл. 
//                  console.log('File copied successfully');
//           });
//         })  
//     }
// })

// fsPromises.copyFile(adress, adressCopy, COPYFILE_EXCL, err => {
//     if(err) throw err; // не удалось скопировать файл. Он уже существует?
//     console.log('Файл успешно скопирован');
// });

// fs.readdir(folderName, (err, files) => {
//     if (err) throw err;
//     console.log(files)

// })

// fs.mkdir(folder, err => { //create folder
//     if (err) throw err;
// });


// fsPromises.mkdir(folder).then(function() {
    
// 	console.log('Directory created successfully');
// }).catch(function() {
// 	console.log('failed to create directory');
// });



// fs.copyFile(adress, err => { 
//     if (err) throw err;
// });

// fs.rmdir(adress, err => { //delete folder
//     if (err) throw err;
// });



// let copyFile = async() => {
//   try {
//     let fsCopyFile = util.promisify(fs.copyFile).bind(fs);
//     let files = await fsCopyFile(adress, adressCopy);
//   } catch (error) {
//     console.error(error);
//   }
// };

// copyFile();

// Node.js program to demonstrate
// the fsPromises.mkdir() Method
	
// Include fs and path module



