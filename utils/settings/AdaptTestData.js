const fs = require('fs');
const path = require('path');
const { DateHelper } = require('../Helpers/DateHelper');

function updateAllDates(obj, keyToUpdate, newValue) {
    if (Array.isArray(obj)) {
        obj.forEach(item => updateAllDates(item, keyToUpdate, newValue));
    } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            if (key === keyToUpdate) {
                obj[key] = newValue;
            } else {
                updateAllDates(obj[key], keyToUpdate, newValue);
            }
        }
    }
}

//Update DateOfTracking of test data activityReportData1.json as I only need one day on the calendar to show with declarations.
//the day has to be in the current month in order to be shown
//therefore, it will be set to the first day of the month
function updateDateOfTrackingOfTestData(filename) {
    const jsonFilePath = path.join(__dirname, '../data/testData/' + filename);

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) throw err;

        let jsonData = JSON.parse(data);

        // Update all dateOfTracking properties
        updateAllDates(jsonData, 'dateOfTracking', DateHelper.getToday());

        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) throw err;
            console.log('All dateOfTracking properties updated for ' + filename);
        });
    });
}

module.exports = { updateDateOfTrackingOfTestData };