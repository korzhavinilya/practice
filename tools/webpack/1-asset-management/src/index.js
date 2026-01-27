import join from 'lodash/join';
import './style.css';
import '../globalstyle.css';
import Icon from '../assets/icon.png';
import Icon2 from '../assets/icon-2.png';
import Data from '../assets/data.xml';
import Notes from '../assets/data.csv';
import toml from '../assets/data.toml';
import yaml from '../assets/data.yaml';
import json from '../assets/data.json5';

function component() {
  const element = document.createElement('div');
  element.innerHTML = join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  const myIcon2 = new Image();
  myIcon2.src = Icon2;
  element.appendChild(myIcon2);

  console.log(Data);
  console.log(Notes);

  console.log(toml);
  console.log(yaml);
  console.log(json);

  return element;
}
document.body.appendChild(component());
