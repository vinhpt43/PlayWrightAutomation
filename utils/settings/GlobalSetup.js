// global-setup.js
const { loginARP } = require('./LoginARP'); // adjust path if needed
const { updateDateOfTrackingOfTestData } = require('./AdaptTestData');

module.exports = async () => {
  // updateDateOfTrackingOfTestData('oneMDproject.json');
  // updateDateOfTrackingOfTestData('twoMDprojects.json');
  // updateDateOfTrackingOfTestData('oneMHproject.json');
  // updateDateOfTrackingOfTestData('twoMHprojects.json');
  // updateDateOfTrackingOfTestData('oneMDoneMHprojects.json');
  // updateDateOfTrackingOfTestData('oneMDprojectWithICO.json');
  // updateDateOfTrackingOfTestData('editDeclarations.json');
  // updateDateOfTrackingOfTestData('PHfullDay.json');
  // updateDateOfTrackingOfTestData('PHO.json');
  // updateDateOfTrackingOfTestData('PHhalfDay.json');
  // updateDateOfTrackingOfTestData('Weekend.json');
  await loginARP();
};