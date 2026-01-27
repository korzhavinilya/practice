console.log('bar started', new Date());

let num3 = 0;
for (let i = 0; i < 100000000; i++) {
  num3 = Math.random();
}

console.log('bar finished', new Date());
