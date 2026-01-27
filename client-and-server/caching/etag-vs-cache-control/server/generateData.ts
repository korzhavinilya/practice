import { faker } from '@faker-js/faker';

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past()
  };
}

export default function generateData(count: number = 5) {
  return faker.helpers.multiple(createRandomUser, {
    count
  });
}
