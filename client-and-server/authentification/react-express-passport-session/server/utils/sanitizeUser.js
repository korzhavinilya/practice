function sanitizeUser(user) {
  console.log('sanitizeUser', user);
  return { id: user.id, username: user.name ?? user.username };
}

module.exports = sanitizeUser;
