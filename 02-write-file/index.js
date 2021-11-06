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
          writeStream.write(`${name}\n`);
          process.stdout.write(`Hi ${name}!\nsomething else?`);
          
      }
      rl.on('line', (input) => {
        if (input === 'exit') {
          rl.close();}
        else {
          process.stdout.write(`something else?\n`);
          writeStream.write(`${input}\n`);
        }
      })
      .on('close', () => {
          stdout.write('Good bye')
      });
  })
