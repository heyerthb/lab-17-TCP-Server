'use strict';

const fs = require('fs');
const net = require('net');
const client = new net.Socket();

let file = process.argv.slice(2).shift();

const util = require('util');
const fsRead = util.promisify(fs.readFile);
const fsWrite = util.promisify(fs.writeFile);

const readFile = (filePath) => fsRead(filePath);
const writeFile = (filePath, buffer) => fsWrite(filePath, buffer);
const upperCase = (buffer) => {
  const convertedBuffer = buffer.toString().trim().toUpperCase();
  return Buffer.from(convertedBuffer);
};


const events = {
  READ_ERROR: 'read_error',
  WRITE_ERROR: 'write_error',
  WRITE_SUCCESS: 'write_success',
};

const alterFile = (path) => {
  
  return readFile(path)
    .then(contents => upperCase(contents))
    .then(buffer => {
      return writeFile(path, buffer)
        .catch(client.write(`${events.WRITE_ERROR}`));
    })
    .then(() => client.write(`${events.WRITE_SUCCESS} ${path}`))
    .catch(e => client.write(`${events.READ_ERROR} ${e.text}`));
};
  
if (process.env.NODE_ENV !== 'test'){
  client.connect (3001, 'localhost', () => {
    console.log('connected to TCP server ');
    alterFile(file);
  });
}

module.exports = {
  readFile,
  writeFile,
  upperCase,
  alterFile,
};