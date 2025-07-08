const { DateHelper } = require('./DateHelper');

// for (let i = 1; i <= 12; i++) {
//     console.log('i = ' + i);
//     console.log('first day ' + DateHelper.getFirstDayOfAMonth(i, 2025));
//     console.log('last day ' + DateHelper.getLastDayOfAMonth(i, 2025));
// }

// console.log(DateHelper.getFirstDayOfCurrentMonth());
// console.log(DateHelper.getLastDayOfCurrentMonth());

// const currentTimestamp = Math.floor(Date.now() / 1000);
// console.log(currentTimestamp + 86400);

// const timestamp = 1751985753;
// const date = new Date(timestamp * 1000);
// console.log(date.toString());
console.log(DateHelper.getToday());