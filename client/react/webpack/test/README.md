# Basic Webpack Tutorial

Source [link](https://www.youtube.com/watch?v=ho1Ce1ITWN4&list=PL6DxKON1uLOHTgN679Es1vkCS911i9HJX&index=3&t=13s&ab_channel=UlbiTV)

Steps:

- `npm install webpack webpack-cli --save-dev`
- `npm i -D style-loader less-loader sass-loader css-loader file-loader`
- `npm i -D sass less`
- `npm i -D html-webpack-plugin clean-webpack-plugin`
- `npm install --save-dev babel-loader @babel/core`
- `npm install @babel/preset-env --save-dev`

Info:

- html-webpack-plugin - to move the html to the /dist and import all js bundles
- clean-webpack-plugin - to clean unused bundles that created by regular expressions [name].[hash].js
- webpack-dev-server - to auto build the project
- style-loader - injects the CSS, that is exported by the JavaScript module, into a style tag at runtime
- css-loader - translates CSS into CommonJS
- saas/less-loader - translates SCSS/LESS into CSS
