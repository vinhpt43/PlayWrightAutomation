module.exports = {
  default: {
    features: 'features/**/*.feature',
    require: [
      'hooks.js',
      'customWorld.js',
      'features/**/*.js'
    ],
    format: ['summary']
  }
};
