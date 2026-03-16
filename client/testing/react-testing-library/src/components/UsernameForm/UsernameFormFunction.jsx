import React, { useState } from 'react';

export default function UsernameFormFunction({ updateUsername }) {
  const [{ status, error }, setState] = useState({
    status: 'idle',
    error: null
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const newUsername = event.target.elements.username.value;
    setState({ status: 'pending' });
    try {
      console.log('invoke function');
      await updateUsername(newUsername);
      console.log('finished function');
      setState({ status: 'fulfilled' });
    } catch (e) {
      setState({ status: 'rejected', error: e });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </div>
      <button type="submit">Submit</button>
      <span>{status === 'pending' ? 'Saving...' : null}</span>
      <span>{status === 'rejected' ? error.message : null}</span>
    </form>
  );
}
