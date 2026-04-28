const { DateHelper } = require('./DateHelper');

// for (let i = 1; i <= 12; i++) {
//     console.log('i = ' + i);
//     console.log('first day ' + DateHelper.getFirstDayOfAMonth(i, 2025));
//     console.log('last day ' + DateHelper.getLastDayOfAMonth(i, 2025));
// }

// console.log(DateHelper.getFirstDayOfCurrentMonth());
// console.log(DateHelper.getLastDayOfCurrentMonth());

// const currentTimestamp = Date();
// const newTimestamp = currentTimestamp + 3600*1000;
// console.log(currentTimestamp.toString());
// console.log(newTimestamp.toString());
// console.log(new Date(currentTimestamp));
// console.log(new Date(newTimestamp));

const timestamp = 1777395934919;
const date = new Date(timestamp);
const now = Date.now();
// const date = new Date();
// const time = new Date.now();
console.log(date.toLocaleString());
console.log(now);
// console.log(time.toString());
// console.log(DateHelper.getToday());