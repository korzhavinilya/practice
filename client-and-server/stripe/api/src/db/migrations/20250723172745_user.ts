import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('email').notNullable().unique();
    table.string('stripe_customer_id').nullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('user');
}
