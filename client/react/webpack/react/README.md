# Basic Webpack Tutorial

Source [link](https://www.youtube.com/watch?v=ho1Ce1ITWN4&list=PL6DxKON1uLOHTgN679Es1vkCS911i9HJX&index=3&t=13s&ab_channel=UlbiTV)

Steps:

- `npm install webpack webpack-cli --save-dev`
- `npm i -D style-loader less-loader sass-loader css-loader`
- `npm i -D sass less`
- `npm i -D html-webpack-plugin`
- `npm install --save-dev babel-loader @babel/core`
- `npm install @babel/preset-env --save-dev`
- `npm install --save-dev @babel/preset-react`
- `npm install --save @babel/polyfill`
- `npm i -D mini-css-extract-plugin`
- `npm install --save-dev webpack-bundle-analyzer`

Info:

- html-webpack-plugin - to move the html to the /dist and import all js bundles
- clean-webpack-plugin - Webpack 5 output.clean = true. to clean unused bundles that created by regular expressions [name].[hash].js
- webpack-dev-server - to auto build the project
- style-loader - injects the CSS, that is exported by the JavaScript module, into a style tag at runtime
- mini-css-extract-plugin - extracts CSS into separate files
- css-loader - translates CSS into CommonJS
- saas/less-loader - translates SCSS/LESS into CSS
