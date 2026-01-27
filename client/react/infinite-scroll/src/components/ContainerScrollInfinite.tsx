import React, { useState, useEffect, useCallback } from 'react';
import type { Post } from '../api/getData';
import getPostQuery from '../api/getData';
import './ContainerScrollInfinite.css';

const ContainerScrollInfinite = () => {
  // 1. Используем ваш тип Post для строгой типизации
  const [posts, setPosts] = useState<Post[]>([]);

  // 2. Вместо "page" используем "nextPostId", т.к. загружаем по одному
  const [nextPostId, setNextPostId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Состояние, чтобы остановить загрузку, если посты кончились

  // 3. Функция для загрузки одного поста
  const fetchPost = useCallback(
    async (postId: number) => {
      if (loading || !hasMore) return; // Не загружаем, если уже идет загрузка или постов больше нет

      setLoading(true);
      try {
        const newPost = await getPostQuery(postId);
        if (newPost && newPost.id) {
          // Проверяем, что пост реально пришел
          setPosts((prev) => [...prev, newPost]);
          setNextPostId((prev) => prev + 1); // Сразу готовим ID для следующего поста
        } else {
          setHasMore(false); // Если пришел пустой ответ, считаем, что посты закончились
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setHasMore(false); // Останавливаем при ошибке
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  ); // Зависимости для useCallback

  // Загружаем самый первый пост при монтировании компонента
  useEffect(() => {
    fetchPost(1);
  }, []); // Пустой массив зависимостей, чтобы сработать один раз

  // 4. Обработчик скролла для элемента, а не для window
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollHeight - scrollTop - clientHeight < 10 && !loading && hasMore) {
      fetchPost(nextPostId);
    }
  };

  return (
    <div className="scroll-container" onScroll={handleScroll}>
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <h3>
            {post.id}. {post.title}
          </h3>
          <p>{post.body}</p>
        </div>
      ))}
      {loading && <p className="loading-indicator">Loading...</p>}
      {!hasMore && <p className="loading-indicator">Больше постов нет.</p>}
    </div>
  );
};

export default ContainerScrollInfinite;
