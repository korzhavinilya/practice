let { users } = require('../users.js');

const resolvers = {
  Query: {
    users(_, args) {
      const { limit = 50, filter } = args;

      if (!filter) {
        return users.slice(0, limit);
      }

      const { name } = filter;

      return users.filter((user) => user.name === name).slice(0, limit);
    },
  },

  Mutation: {
    createUser(_, args) {
      const newUser = args.user;
      newUser._id = '' + Math.random;
      users.push(newUser);
      return newUser;
    },

    updateUser(_, args) {
      const updateUser = args.user;
      if (updateUser._id) {
        users = users.map((user) => {
          if (user._id === updateUser._id) {
            return updateUser;
          }
          return user;
        });
      }
      return updateUser;
    },

    deleteUser(_, args) {
      const id = args.id;
      const user = users.find((user) => user._id === id);
      if (user) {
        users = users.filter((user) => user._id !== id);
        return user;
      }
      return null;
    },
  },
};

module.exports = {
  resolvers,
};
