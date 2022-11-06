const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'utility-app',
    projectName: 'utility-project',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: ['rxjs'],
    // modify the webpack config however you'd like to by adding to this object
  });
};
