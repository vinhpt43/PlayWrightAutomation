// global-setup.js
const { loginARP } = require('./LoginARP'); // adjust path if needed

module.exports = async () => {
  await loginARP();
};