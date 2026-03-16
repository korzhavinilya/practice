import db from '../db';
import { ReturningIds } from '../types/db.type';
import { ProductQueryResult, ProductSchema } from '../types/product.type';

export default class ProductsService {
  static async findAll(userId: string) {
    return await db('product')
      .leftJoin('subscription', 'product.id', 'subscription.product_id')
      .where('product.user_id', userId)
      .select<ProductQueryResult[]>([
        'product.id',
        'product.name',
        'product.user_id',
        'subscription.id as subscription_id',
        'subscription.current_period_start as current_period_start',
        'subscription.current_period_end as current_period_end'
      ]);
  }

  static async create(userId: string) {
    const res = await db('product').count('* as count');
    const count = Number(res[0].count);

    await db('product')
      .insert({ name: `Product #${count + 1}`, user_id: userId })
      .returning<ReturningIds>('id')
      .then((ids) => ids[0].id);
  }

  // static async patchById(id: string, product: Partial<ProductSchema>) {
  //   await db.raw('PRAGMA foreign_keys = ON');

  //   await db('product')
  //     .where('id', id)
  //     .update({
  //       ...product
  //     });
  // }
}
