module.exports = {
  default: [
    '--require', 'cucumber/hooks.js',
    '--require', 'cucumber/customWorld.js',
    '--require', 'features/ActivityReport/step_definitions/ActivityReport_steps.js',
    '--format', 'summary'
  ].join(' ')
};