const UserService = require('./UserService');
const axios = require('axios');

jest.mock('axios');

describe('UserService', () => {
  let response;

  beforeEach(() => {
    response = {
      data: {},
    };
  });

  it('should return mock value', async () => {
    const users = [{ name: 'Bob' }];
    const response = { data: users };

    axios.get.mockResolvedValue(response);

    const usersResponse = await UserService.findAll();
    expect(usersResponse).toEqual(users);
  });
});
