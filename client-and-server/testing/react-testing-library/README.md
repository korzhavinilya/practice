# React testing library

## Query Types

- ...By - returns 1 element
- ...All - returns an array

- findBy - returns promise to work with async code
- getBy - if element isn't found it throws an error
- queryBy - we can ensure that element doesn't exist it returns null

## Events

- fireEvent - to simple click or input
- userEvent - to simulate real user double click, tab, upload, keydown. It doesn't work with specific events but only with user actions
