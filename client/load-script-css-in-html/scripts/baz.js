console.log('baz started', new Date());

let num2 = 0;
for (let i = 0; i < 100000000; i++) {
  num2 = Math.random();
}

console.log('baz finished', new Date());
