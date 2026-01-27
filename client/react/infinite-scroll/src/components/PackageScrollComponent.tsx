import { useState, useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './PackageScrollComponent.css'; // Стили для компонента
import getPostQuery, { type Post } from '../api/getData';

const PackageScrollComponent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextPostId, setNextPostId] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 1. Функция для загрузки следующего поста
  const fetchNextPost = useCallback(async () => {
    try {
      const newPost = await getPostQuery(nextPostId);

      if (newPost && newPost.id) {
        // Добавляем новый пост с небольшой задержкой для демонстрации лоадера
        setTimeout(() => {
          setPosts((prevPosts) => [...prevPosts, newPost]);
          setNextPostId((prevId) => prevId + 1);
        }, 500); // 500ms задержка
      } else {
        // Если API не вернуло пост, считаем, что они закончились
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
      setHasMore(false); // Останавливаем загрузку при ошибке
    }
  }, [nextPostId]); // Зависимость от nextPostId, чтобы всегда запрашивать свежий ID

  // Загружаем самый первый пост при монтировании компонента,
  // чтобы было что отображать изначально.
  useEffect(() => {
    fetchNextPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // 2. Родительский div, который будет скроллиться.
    // У него должен быть уникальный id.
    <div id="scrollableDiv" className="scroll-container">
      {/* 3. Используем компонент из библиотеки */}
      <InfiniteScroll
        dataLength={posts.length} // Текущее количество элементов
        next={fetchNextPost} // Функция для загрузки следующих данных
        hasMore={hasMore} // Сообщаем, есть ли еще данные
        loader={<h4 className="status-text">Загрузка...</h4>} // Лоадер
        endMessage={
          // Сообщение в конце
          <p className="status-text">
            <b>Вы все посмотрели!</b>
          </p>
        }
        scrollableTarget="scrollableDiv" // !!! Самый важный проп для вашей задачи
      >
        {/* Отображаем наши посты */}
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <h3>
              {post.id}. {post.title}
            </h3>
            <p>{post.body}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PackageScrollComponent;
