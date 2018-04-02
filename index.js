const fs = require('fs');
const appRootDir = require('app-root-dir').get();
const stamper = require('./modules/stamper');

function appendFile(content, cb) {
  fs.appendFile(`${appRootDir}/logs/${stamper.getDateStamp()}`, `${stamper.getTimeStamp()} ${content}`, (error) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null);
  });
}

function makeDir(content, cb) {
  fs.mkdir(`${appRootDir}/logs`, (error) => {
    if (error) {
      cb(error);
      return;
    }
    appendFile(content, cb);
  });
}

function checkDirectory(content, cb) {
  fs.access(`${appRootDir}/logs`, (error) => {
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
