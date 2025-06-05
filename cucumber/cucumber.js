module.exports = {
  default: [
    '--require', 'cucumber/hooks.js',
    '--require', 'cucumber/customWorld.js',
    '--require', 'features/**/*.js',
    '--format', 'summary'
  ].join(' ')
};