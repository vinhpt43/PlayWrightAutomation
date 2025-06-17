module.exports = {
  default: [
    '--require', 'hooks.js',
    '--require', 'customWorld.js',
    '--require', 'features/**/*.js',
    '--format', 'summary'
  ].join(' ')
};