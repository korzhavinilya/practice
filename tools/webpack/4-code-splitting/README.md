# Code Splitting

## Approaches

### Entry Points

```
entry: {
    index: './src/index.js',
    another: './src/another-module.js',
},
output: {
    filename: '[name].bundle.js'
}
```

- If there are any duplicated modules between entry chunks they will be included in both bundles.
- It isn't as flexible and can't be used to dynamically split code with the core application logic.

### Prevent Duplication

#### Entry dependencies

```
entry: {
   index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash',
},
optimization: {
    runtimeChunk: 'single',
},
```

#### SplitChunksPlugin

it allows us to extract common dependencies into an existing entry chunk or an entirely new chunk.



### Dynamic Imports

```
return import('lodash')
    .then(({ default: _ }) => {
      const element = document.createElement('div');
      element.innerHTML = _.join(['Hello', 'webpack'], ' ');
```

### Lazy Loading

```
export default () => {
  console.log('Button Clicked: Here\'s "some text"!');
};

const lazyPrint = import(/* webpackChunkName: "print" */ './print');
  const printModule = await lazyPrint;
  const print = printModule.default;
```
