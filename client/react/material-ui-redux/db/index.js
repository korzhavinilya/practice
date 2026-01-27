const users = require('./users.json');
const posts = require('./posts.json');
const comments = require('./comments.json');

module.exports = () => ({
  users,
  posts,
  comments,
});
