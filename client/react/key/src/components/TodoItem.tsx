import { useState } from 'react';

export const TodoItem = ({
  text,
  onRemove
}: {
  text: string;
  onRemove: () => void;
}) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <li style={{ marginBottom: '10px', listStyle: 'none' }}>
      <strong>{text}</strong>
      <input
        type="text"
        placeholder="Комментарий..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ marginLeft: '10px' }}
      />
      <button onClick={onRemove}>remove</button>
    </li>
  );
};
