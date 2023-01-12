# React Redux Old Style

### Redux

Библиотека для работы с состоянием приложения, хранилище данных

- [state] Банк
- [actions] Снять деньги
- [dispatch] Диспетчер, помогает снимать деньги. С деньгами не работает, передаёт actions редьюсеру
- [reducer] Компьютер который выполняет действия

### Steps

- npm i redux react-redux
- создать store createStore()
- создать редьюсер, функция с (state, action)
- передать редьюсер в store
- обернуть приложение в Provider
- добавить новый редьюсер, объеденить combineReducers и передать в store
- npm i redux-devtools-extension
- npm i redux-saga
- npm i redux-thunk

### Info

- redux - библиотека
- react-redux - связывает состояние редакса с реакт компонентами
- redux-devtools-extension - для работы с middleware с devtools установить 
- redux требует чтобы reducers возвращали чистые функции return {...state, field: state.bill.count + 1}, можно использовать immer.js
