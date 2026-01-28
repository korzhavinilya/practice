import { SubmitButton } from '@/app/rsc/SubmitButton';
import { createPostAction } from './actions';
import { SubmitInput } from './SubmitInput';

// Это Server Component
export default async function PostsPage() {
  // Имитируем получение данных напрямую из БД
  const posts = [{ id: 1, title: 'Первый пост' }];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Посты</h1>

      {/* Форма работает БЕЗ JS благодаря Progressive Enhancement */}
      <form action={createPostAction} className="mb-8 flex gap-2">
        <SubmitInput />

        <SubmitButton />
      </form>

      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border-b py-2">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
