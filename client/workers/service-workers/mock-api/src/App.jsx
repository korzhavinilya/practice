import React, { useState } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);

  function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }

  return (
    <div>
      <button onClick={fetchUsers}>Fetch users (Intercept)</button>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
