"use strict";

var hello = function hello() {
  return console.log('hello world!');
};
var arr = Array(10).fill(1).map(function (_, index) {
  return "Value: ".concat(index);
});
