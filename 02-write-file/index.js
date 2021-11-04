const fs = require('fs');
const process = require('process');
const path = require('path');
const readLine = require('readline');
const { stdout } = require('process');

const adressNew = path.join('02-write-file', '/new-text.txt')
const writeStream = fs.createWriteStream(adressNew);

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question(`Whats your name? `, (name) => {
      if (name === 'exit') {
        process.stdout.write(`Bye!`);
        rl.close();
      } else {
          writeStream.write(name);
          process.stdout.write(`Hi ${name}!\n`);
      }
      rl.on('line', (input) => {
        if (input === 'exit') {
        rl.close();
      }  
      })
      .on('close', () => {
          stdout.write('Good bye')
      });

      
      
    //   else if (name){
    //        process.stdout.write(`Hi ${name}!`);
    //        writeStream.write(`${name}\n`);
    //   }
//   console.log(`Hi ${name}!`);

//   process.stdin.write(name);
  })

  rl.on('error', (err) => {
      if (err.code == 'ENDENT') {
          console.log('File is not found')
      } else {
          console.error(err);
      }
  });
