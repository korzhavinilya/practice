import { Knex } from 'knex';
import { UserSchema } from '../../types/user.type';

export const dummyUsers: UserSchema[] = [
  {
    id: '4c871832-3d74-4f24-9775-ff9778a2e9b5',
    email: 'test1@gmail.com',
    stripe_customer_id: null
  },
  {
    id: '02798fd2-1acf-44b8-a544-8427936d1fea',
    email: 'test2@gmail.com',
    stripe_customer_id: null
  }
];

export async function seed(knex: Knex): Promise<void> {
  await knex('user').del();

  await knex('user').insert(dummyUsers);
}
