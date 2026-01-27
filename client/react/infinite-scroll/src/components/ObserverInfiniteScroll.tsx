import { useState, useEffect, useCallback, useRef } from 'react';
import './ObserverContainerScroll.css'; // Стили для компонента
import getPostQuery, { type Post } from '../api/getData';

const ObserverContainerScroll = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextPostId, setNextPostId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 1. Ref для контейнера, который будет скроллиться
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 2. Ref для элемента-триггера в конце списка
  const triggerRef = useRef<HTMLDivElement>(null);

  // Функция для загрузки данных (осталась такой же)
  const fetchPost = useCallback(
    async (postId: number) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const newPost = await getPostQuery(postId);
        if (newPost && newPost.id) {
          setPosts((prev) => [...prev, newPost]);
          setNextPostId((prev) => prev + 1);
        } else {
          setHasMore(false); // Посты закончились
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  ); // Зависимости для useCallback

  // 3. Основной useEffect для IntersectionObserver
  useEffect(() => {
    // Функция, которая будет вызываться, когда триггер появится в зоне видимости
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // entries[0] - это наш элемент-триггер
      if (entries[0].isIntersecting && hasMore && !loading) {
        fetchPost(nextPostId);
      }
    };

    // Создаем "наблюдателя"
    const observer = new IntersectionObserver(handleIntersect, {
      // root: наш скроллящийся контейнер. Наблюдение будет внутри него.
      root: scrollContainerRef.current,
      // threshold: 1.0 означает, что колбэк сработает, когда триггер виден на 100%
      threshold: 1.0
    });

    // Начинаем наблюдение за элементом-триггером
    const triggerElement = triggerRef.current;
    if (triggerElement) {
      observer.observe(triggerElement);
    }

    // Функция очистки: прекращаем наблюдение, когда компонент размонтируется
    return () => {
      if (triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [loading, hasMore, nextPostId, fetchPost]); // Перезапускаем эффект при изменении этих зависимостей

  return (
    // Привязываем ref к нашему контейнеру
    <div className="scroll-container" ref={scrollContainerRef}>
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <h3>
            {post.id}. {post.title}
          </h3>
          <p>{post.body}</p>
        </div>
      ))}

      {/* 4. Элемент-триггер. Он находится внизу списка. */}
      {/* Мы его не прячем, а показываем в нем статус загрузки. */}
      <div ref={triggerRef} className="loading-trigger">
        {loading && <p>Загрузка...</p>}
        {!hasMore && <p>Больше постов нет.</p>}
      </div>
    </div>
  );
};

export default ObserverContainerScroll;
