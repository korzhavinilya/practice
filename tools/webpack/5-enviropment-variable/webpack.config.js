const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = (env, args) => {
  console.log({ env, args });

  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    plugins: [new Dotenv({ path: `./.env.${args.mode}` })],
  };
};
