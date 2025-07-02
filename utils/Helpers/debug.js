const { DateHelper } = require('./DateHelper');

for (let i = 1; i <= 12; i++) {
    console.log('i = ' + i);
    console.log('first day ' + DateHelper.getFirstDayOfAMonth(i, 2025));
    console.log('last day ' + DateHelper.getLastDayOfAMonth(i, 2025));
}

console.log(DateHelper.getFirstDayOfCurrentMonth());
console.log(DateHelper.getLastDayOfCurrentMonth());