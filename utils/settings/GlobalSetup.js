// global-setup.js
const { loginARP } = require('./LoginARP'); // adjust path if needed
const { updateDateOfTrackingOfTestData } = require('./AdaptTestData');

module.exports = async () => {
  updateDateOfTrackingOfTestData('oneMDproject.json');
  updateDateOfTrackingOfTestData('twoMDprojects.json');
  updateDateOfTrackingOfTestData('oneMHproject.json');
  updateDateOfTrackingOfTestData('twoMHprojects.json');
  updateDateOfTrackingOfTestData('oneMDprojectWithICO.json');
  await loginARP();
};