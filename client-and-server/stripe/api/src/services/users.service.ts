import db from '../db';
import ApiError from '../errors/api.error';
import { ReturningIds } from '../types/db.type';
import { UserSchema } from '../types/user.type';

export default class UsersService {
  static async findAll() {
    return await db('user').select<UserSchema[]>('*');
  }

  static async findById(id: string) {
    const row = await db('user')
      .where('id', id)
      .select<UserSchema>('*')
      .first();

    if (!row) {
      throw ApiError.NotFound('User not found by id: ' + id);
    }

    return row;
  }

  static async findByCustomerId(id: string) {
    const row = await db('user')
      .where('stripe_customer_id', id)
      .select<UserSchema>('*')
      .first();

    if (!row) {
      throw ApiError.NotFound('User not found by stripe_customer_id: ' + id);
    }

    return row;
  }

  static async create() {
    const res = await db('user').count('* as count');
    const count = Number(res[0].count);

    await db('user')
      .insert({ email: `test${count + 1}@gmail.com` })
      .returning<ReturningIds>('id')
      .then((ids) => ids[0].id);
  }

  static async patchById(id: string, user: Partial<UserSchema>) {
    await db.raw('PRAGMA foreign_keys = ON');

    await db('user')
      .where('id', id)
      .update({
        ...user
      });

    return this.findById(id);
  }
}
