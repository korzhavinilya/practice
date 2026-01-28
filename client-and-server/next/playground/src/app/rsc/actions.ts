'use server'; // Магическая директива: всё в этом файле — серверные эндпоинты

import { revalidatePath } from 'next/cache';

// Имитация БД
const db = {
  posts: [] as { id: number; title: string }[],
  async create(title: string) {
    await new Promise((res) => setTimeout(res, 1000)); // Имитируем задержку
    const newPost = { id: Date.now(), title };
    this.posts.push(newPost);
    return newPost;
  }
};

export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string;

  if (!title || title.length < 3) {
    throw new Error('Слишком короткий заголовок!');
  }

  // 1. Напрямую пишем в базу! Никаких API-роутов.
  await db.create(title);

  // 2. Инвалидируем кэш страницы.
  // Next.js перерендерит страницу на сервере и пришлет новый RSC Payload клиенту.
  revalidatePath('/posts');
}
