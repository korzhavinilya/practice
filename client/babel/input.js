const hello = () => console.log('hello world!');

const arr = Array(10)
  .fill(1)
  .map((_, index) => `Value: ${index}`);
