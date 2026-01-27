module.exports = {
  async up(queryInterface) {
    await queryInterface.addIndex('Users', ['firstName', 'lastName'], {
      unique: true,
      name: 'idx_users_firstName_lastName',
    });
  },
  async down(queryInterface) {
    await queryInterface.removeIndex('Users', 'idx_users_firstName_lastName');
  },
};
