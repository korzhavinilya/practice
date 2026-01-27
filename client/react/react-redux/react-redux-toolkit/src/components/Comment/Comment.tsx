import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { commentApi } from '../../services/commentApi';
import './Comment.css';

export default function Comment() {
  const { id } = useParams();

  const param = id ? +id : skipToken;

  const {
    data: comment,
    isLoading,
    error
  } = commentApi.useGetCommentQuery(param);

  const [updateComment] = commentApi.useUpdateCommentMutation();

  const [updatedComment, setUpdatedComment] = useState('');

  useEffect(() => {
    if (comment?.body) {
      setUpdatedComment(comment.body);
    }
  }, [comment?.body]);

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

  async function handleUpdateComment() {
    if (!comment) {
      return;
    }

    await updateComment({ ...comment, body: updatedComment });
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h2>Comment</h2>
      {isLoading && <h3>Loading...</h3>}
      {error && <h3>Ошибка...</h3>}

      <Link to="/comments">back</Link>

      <div className="comment-wrapper">
        <div className="">
          <h5>{comment?.email}</h5>
          <textarea
            rows={10}
            value={updatedComment}
            onChange={(e) => setUpdatedComment(e.target.value)}
          />
        </div>
      </div>

      <button onClick={handleUpdateComment}>Save</button>
    </div>
  );
}
