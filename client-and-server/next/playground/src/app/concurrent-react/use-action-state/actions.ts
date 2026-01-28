'use server';

export async function createUser() {
  await new Promise((res) => setTimeout(res, 1000));
  return { message: 'User created' };
}
