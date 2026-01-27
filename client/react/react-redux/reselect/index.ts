import { createSelector } from 'reselect';

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Guest' },
  { id: 3, name: 'User3' },
  { id: 4, name: 'User4' },
  { id: 5, name: 'User5' },
  { id: 6, name: 'User6' },
  { id: 7, name: 'User7' }
];

interface State {
  users: User[];
}

const state: State = {
  users
};

interface Filters {
  minId: number;
  maxId: number;
}

const filters: Filters = {
  minId: 2,
  maxId: 5
};

const selectAllUsers = (state: State) => {
  console.log('selectAllUsers');
  return state.users;
};

const selectFiltersArg = (_: State, __: string, filters: Filters) => {
  console.log('selectFiltersArg');
  return filters;
};

const selectFilteredUsers = createSelector(
  [selectAllUsers, selectFiltersArg],
  (users, filters) => {
    console.log('[calculation] selectFilteredUsers');
    const { minId, maxId } = filters;
    return users.filter((user) => user.id >= minId && user.id <= maxId);
  }
);

const selectQueryArg = (_: State, query: string) => {
  console.log('selectQueryArg');
  return query;
};

const selectUsersBySearchQueryAndFilters = createSelector(
  [selectFilteredUsers, selectQueryArg],
  (filteredUsers, query) => {
    console.log('[calculation] selectUsersBySearchQueryAndFilters');
    return filteredUsers.filter((user) => user.name.includes(query));
  }
);

// запуск всех input и result селекторов
const result1 = selectUsersBySearchQueryAndFilters(state, 'Use', filters);
console.log('result1', result1);

// запуск input селекторов и selectUsersBySearchQueryAndFilters result
const result2 = selectUsersBySearchQueryAndFilters(state, 'Gu', filters);
console.log('result2', result2);

// ничего не выполняется, изменение было по ссылке
state.users[1].name = 'Guest2';
const result3 = selectUsersBySearchQueryAndFilters(state, 'Gu', filters);
console.log('result3', result3);

// ничего не выполняется, потому что изменение было по ссылке,
// user.id = 2 всё ещё в результате
state.users = state.users.filter((user) => user.id !== 2);
const result4 = selectUsersBySearchQueryAndFilters(state, 'Gu', filters);
console.log('result4', result4);

// запуск всех input и result селекторов
// пустой ответ, удалили user.id = 2
const newState = {
  ...state,
  users: state.users.filter((user) => user.id !== 2)
};
const result5 = selectUsersBySearchQueryAndFilters(newState, 'Gu', filters);
console.log('result5', result5);
