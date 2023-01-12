const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  // mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  module: {
    rules: [
      //   // loaders
      //   {
      //     test: /\.css$/i,
      //     use: ['style-loader', 'css-loader'],
      //   },
      //   {
      //     test: /\.less$/i,
      //     use: ['style-loader', 'css-loader', 'less-loader'],
      //   },
      //   {
      //     test: /\.s[ac]ss$/i,
      //     use: ['style-loader', 'css-loader', 'sass-loader'],
      //   },
      //   {
      //     test: /\.(png|jpe?g|gif|svg)$/i,
      //     use: [
      //       {
      //         loader: 'file-loader',
      //       },
      //     ],
      //   },
      // babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    port: 3000,
  },
};
