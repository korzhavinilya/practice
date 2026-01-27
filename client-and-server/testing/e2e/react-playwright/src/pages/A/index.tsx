import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function A() {
  const [name, setName] = useState('Ilya');
  const [lastName, setLastName] = useState('Korzhavin');

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(`${name} ${lastName}`);

    if (name && lastName) {
      navigate('/b');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      A Page
      <Link to={'/b'}>go to B</Link>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        <label>
          name:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          last name:
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <button>login</button>
      </form>
    </div>
  );
}
