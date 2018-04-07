module.exports = {
  getDateStamp(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  },
  getTimeStamp(date) {
    return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
  },
};
