# React Redux Toolkit

### Steps

- npm install @reduxjs/toolkit react-redux @types/react-redux
- add thunk function fetchUsers
- add special async thunk fetchUsersV2 with extraReducers
- add RTK Query (react toolkit query) postAPI, middleware and reducer. It has refetch function and pollingInterval
- add server folder and makefile
- update postAPI add providesTags to help rtk understand when to put new posts

### Info

- redux slice - обёртка над reducers использует createAction и createReduce
- redux позволяет менять state в reducers, immer.js под капотом
