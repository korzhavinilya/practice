import { useEffect, useState } from 'react';
import { Post, postAPI } from '../services/postService';

export default function Posts() {
  const [limit, setLimit] = useState(20);
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = postAPI.useFetchPostsQuery(
    limit
    // { pollingInterval: 1000 }
  );

  const [createPost, { error: createError, isLoading: isCreateErrorLoading }] =
    postAPI.useCreatePostMutation();

  const [updatePost] = postAPI.useUpdatePostMutation();
  const [deletePost] = postAPI.useDeletePostMutation();

  useEffect(() => {
    const interval = setInterval(() => {
      setLimit((limit) => limit + 1);
    }, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  async function handleCreatePost() {
    const title = prompt('title') || '';
    const body = prompt('body') || '';
    await createPost({ id: Date.now(), title, body });
  }

  async function handleDeletePost(id: number) {
    await deletePost(id);
  }

  async function handleUpdatePOst(id: number) {
    const title = prompt('title') || '';
    const body = prompt('body') || '';
    await updatePost({ id, title, body });
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2>Posts</h2>
      <button onClick={() => refetch()}>refetch</button>
      <button onClick={handleCreatePost}>Add new post</button>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>Ошибка...</h3>}
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            <h5>{post.body}</h5>
            <button onClick={() => handleDeletePost(post.id)}>delete</button>
            <button onClick={() => handleUpdatePOst(post.id)}>update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
