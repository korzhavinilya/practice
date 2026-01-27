const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Code Splitting',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    minimize: false,
    // SplitChunksPlugin
    splitChunks: {
      minSize: 0,
      chunks: 'initial',
      minChunks: 4,
      cacheGroups: {
        // Disabling this cache group.
        default: false,
      },
    },
  },
};
