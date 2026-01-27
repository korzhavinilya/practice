import axios from 'axios';
import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';

export default function Header() {
  const [users, setUsers] = useState([]);

  async function search(searchTerms) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/users'
    );

    const users = response.data;

    const filteredUsers = users.filter((user) =>
      user.name.includes(searchTerms)
    );

    setUsers(filteredUsers);
  }

  return (
    <div>
      <SearchBar search={search} />
      {users.length > 0 && (
        <ul>
          {users.map((user) => {
            return <li key={user.id}>{user.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
