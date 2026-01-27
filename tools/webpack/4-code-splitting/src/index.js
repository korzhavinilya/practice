import _ from 'lodash';

const lazyPrint = import(/* webpackChunkName: "print" */ './print');

async function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  const br = document.createElement('br');

  button.innerHTML = 'Click me and look at the console!';
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.appendChild(br);
  element.appendChild(button);

  const printModule = await lazyPrint;
  const print = printModule.default;
  button.onclick = () => {
    print();
  };

  return element;
}

component().then((element) => {
  document.body.appendChild(element);
});

// document.body.appendChild(component());
