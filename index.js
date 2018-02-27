const fs = require('fs');
const appRootDir = require('app-root-dir').get();

const dir = `${appRootDir}/logs`;

function appendFile(content, cb) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateStamp = `${day}-${month}-${year}`;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timeStamp = `[${hours}:${minutes}:${seconds}]`;
  fs.appendFile(`${dir}/${dateStamp}`, `${timeStamp} ${content}\n`, (error) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null);
  });
}

function makeDir(content, cb) {
  fs.mkdir(dir, (error) => {
    if (error) {
      cb(error);
      return;
    }
    appendFile(content, cb);
  });
}

function checkDirectory(content, cb) {
  fs.access(dir, (error) => {
    if (error && error.code === 'ENOENT') {
      makeDir(content, cb);
      return;
    } else if (error) {
      cb(error);
      return;
    }
    appendFile(content, cb);
  });
}

module.exports.log = (content) => {
  checkDirectory(content, (error) => {
    if (error) {
      console.error(error);
    }
  });
};
