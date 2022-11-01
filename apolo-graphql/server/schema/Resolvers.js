let { users, classes } = require('../data.js');

const resolvers = {
  Query: {
    classes(parent, args, context, info) {
      console.log('Query: classes');
      return classes;
    },
    users(parent, args, context) {
      console.log('Query: users');
      const { limit = 50, filter } = args;

      if (!filter) {
        return users.slice(0, limit);
      }

      const { name } = filter;

      return users.filter((user) => user.name.includes(name)).slice(0, limit);
    },
  },

  Class: {
    users(classObj) {
      console.log('Class: users');
      return users.filter((user) => user.classId === classObj._id);
    },
  },

  User: {
    class(userObj) {
      console.log('User: class');
      return classes.find((classObj) => classObj._id === userObj.classId);
    },
  },

  Mutation: {
    createUser(parent, args, context) {
      const newUser = args.user;
      newUser._id = '' + Math.random;
      users.push(newUser);
      return newUser;
    },

    updateUser(parent, args, context) {
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

    deleteUser(parent, args, context) {
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
