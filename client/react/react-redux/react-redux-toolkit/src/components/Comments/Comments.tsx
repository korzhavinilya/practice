import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { commentApi } from '../../services/commentApi';
import { postAPI } from '../../services/postService';
import './Comments.css';

export default function Comments() {
  const [limit, setLimit] = useState(5);
  const [hoveredComment, setHoveredComment] = useState<number>();

  const {
    data: comments,
    isLoading,
    error,
    refetch
  } = commentApi.useGetCommentsQuery(limit);

  const prefetchHoveredComment = commentApi.usePrefetch('getComment');

  const [updateComment] = commentApi.useUpdateCommentMutation();

  // const [createPost, { error: createError, isLoading: isCreateErrorLoading }] =
  //   postAPI.useCreatePostMutation();

  // const [updatePost] = postAPI.useUpdatePostMutation();
  // const [deletePost] = postAPI.useDeletePostMutation();

  // async function handleCreatePost() {
  //   const title = prompt('title') || '';
  //   const body = prompt('body') || '';
  //   await createPost({ id: Date.now(), title, body });
  // }

  // async function handleDeletePost(id: number) {
  //   await deletePost(id);
  // }

  // async function handleUpdatePost(id: number) {
  //   const title = prompt('title') || '';
  //   const body = prompt('body') || '';
  //   await updatePost({ id, title, body });
  // }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h2>Comments</h2>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>Ошибка...</h3>}

      <button
        onClick={() => {
          updateComment({
            postId: 1,
            id: 1,
            name: '123',
            email: '123',
            body: '1234'
          });
        }}
      >
        test
      </button>

      <ul className="comments-wrapper">
        {comments?.map((comment) => (
          <Link key={comment.id} to={`/comments/${comment.id}`}>
            <li
              className="comment-wrapper"
              // onMouseEnter={() => prefetchHoveredComment(comment.id)}
            >
              <h5>{comment.email}</h5>
              <p>{comment.body}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
