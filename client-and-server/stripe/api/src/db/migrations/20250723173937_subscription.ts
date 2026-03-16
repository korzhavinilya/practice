import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('subscription', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id').references('id').inTable('user');
    table.uuid('product_id').references('id').inTable('product');
    table.timestamp('current_period_start').notNullable();
    table.timestamp('current_period_end').notNullable();
    table.unique(['user_id', 'product_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('subscription');
}
