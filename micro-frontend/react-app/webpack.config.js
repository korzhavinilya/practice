const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'react-app',
    projectName: 'react-project',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: ['@utility-app/utility-project', 'rxjs'],
    // modify the webpack config however you'd like to by adding to this object
  });
};
