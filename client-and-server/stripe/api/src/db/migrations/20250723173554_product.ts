import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('name').notNullable().unique();
    table.uuid('user_id').references('id').inTable('user');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('product');
}
