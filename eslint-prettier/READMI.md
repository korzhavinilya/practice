Airbnb rules list: https://airbnb.io/javascript/

ESlint modules:

- https://www.npmjs.com/package/eslint-config-airbnb-base
- https://www.npmjs.com/package/eslint-config-airbnb-typescript

Prettier:

```
npm install --save-dev prettier eslint-config-prettier
```

eslint-config-prettier - to disable rules overriding

Code example:

```
var a = 1;
var b = 2;

var count = 1;
if (true) {
  count += 1;
}

const item = new Object();

const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

const items = new Array();
```


Links:
- https://blog.logrocket.com/linting-typescript-using-eslint-and-prettier/