

var moment = require('moment');
// var date = new Date();
// console.log(date.getMonth());
var createdAt = 1234;

// var date = moment(1234);
var date = moment();

var nowTimeStamp = moment().valueOf();


console.log(date.format('YYYY , MM , Do '));
console.log(date.add(1,'year').subtract(1,'months').format());
console.log(date.format('h:mm a'));
console.log("current Time Stamp ",nowTimeStamp);
