console.log('foo started', new Date());

let num = 0;
for (let i = 0; i < 100000000; i++) {
  num = Math.random();
}

console.log('foo finished', new Date());
