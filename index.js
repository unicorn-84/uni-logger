const fs = require('fs');
const stamper = require('./modules/stamper');
const path = require('path');

function appendFile(content, cb) {
  fs.appendFile(path.join(this.path, stamper.getDateStamp(this.date)), `${stamper.getTimeStamp(this.date)} ${content}`, (error) => {
    if (error) {
      cb(error);
      return;
    }
    cb(null);
  });
}

function checkOptions(options) {
  if (typeof options !== 'object') {
    throw new TypeError(`uni-logger "options" must be an object, got ${typeof options} instead.`);
  }
  if (!Object.prototype.hasOwnProperty.call(options, 'path')) {
    throw new Error('uni-logger "options" must have a "path" property.');
  }
}

function Logger(options) {
  checkOptions(options);
  this.path = `${options.path}`;
}

Logger.prototype.log = function log(content) {
  this.date = new Date();
  appendFile.call(this, content, (error) => {
    if (error) {
      console.error(error);
    }
  });
};

module.exports = Logger;
