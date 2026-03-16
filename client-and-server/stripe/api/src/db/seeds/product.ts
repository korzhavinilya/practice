import { Knex } from 'knex';
import { ProductSchema } from '../../types/product.type';
import { dummyUsers } from './user';

export const dummyProducts: ProductSchema[] = [
  {
    id: 'bc808672-f8e1-452d-990b-c29301dfc54f',
    name: 'Product #1',
    user_id: dummyUsers[0].id
  }
];

export async function seed(knex: Knex): Promise<void> {
  await knex('product').del();

  await knex('product').insert(dummyProducts);
}
