const fs = require('fs');
const stamper = require('./modules/stamper');
const path = require('path');

function appendFile(content, cb) {
  fs.appendFile(path.resolve(this.path, stamper.getDateStamp()), `${stamper.getTimeStamp()} ${content}`, (error) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null);
  });
}

function makeDir(content, cb) {
  fs.mkdir(path.resolve(this.path), (error) => {
    if (error) {
      cb(error);
      return;
    }
    appendFile.call(this, content, cb);
  });
}

function checkDirectory(content, cb) {
  fs.access(path.resolve(this.path), (error) => {
    if (error && error.code === 'ENOENT') {
      makeDir.call(this, content, cb);
      return;
    } else if (error) {
      cb(error);
      return;
    }
    appendFile.call(this, content, cb);
  });
}

function checkOptions(options) {
  if (typeof options !== 'object') {
    throw new TypeError(`uni-logger "options" must be an object, got ${typeof options} instead.`);
  }
  if (!Object.prototype.hasOwnProperty.call(options, 'path')) {
    throw new TypeError('uni-logger "options" must have a "path" property.');
  }
}

function Logger(options) {
  checkOptions(options);
  this.path = `${options.path}`;
}

Logger.prototype.log = function log(content) {
  checkDirectory.call(this, content, (error) => {
    if (error) {
      console.error(error);
    }
  });
};

module.exports = Logger;
