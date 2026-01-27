import { useState } from 'react';
import { TodoItem } from './TodoItem';

export const KeyExample = () => {
  const [todos, setTodos] = useState([
    { id: 'a1', task: 'React' },
    { id: 'b2', task: 'TypeScript' }
  ]);

  const addToStart = () => {
    const newId = crypto.randomUUID();
    setTodos([{ id: newId, task: 'New Task' }, ...todos]);
  };

  const remove = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={addToStart}>Добавить в начало</button>

      <div style={{ display: 'flex', gap: '50px', marginTop: '20px' }}>
        <div>
          <div>
            <h3>Index as Key</h3>
            <ul>
              {todos.map((todo, index) => (
                <TodoItem
                  key={index}
                  text={todo.task}
                  onRemove={() => remove(todo.id)}
                />
              ))}
            </ul>
          </div>

          <br />

          <div>
            <h3>Random key</h3>
            <ul>
              {todos.map((todo) => (
                <TodoItem
                  // eslint-disable-next-line react-hooks/purity
                  key={Math.random()}
                  text={todo.task}
                  onRemove={() => remove(todo.id)}
                />
              ))}
            </ul>
          </div>

          <div>
            <h3>Key duplication</h3>
            <ul>
              {todos.map((todo) => (
                <TodoItem
                  key={todos[0].id}
                  text={todo.task}
                  onRemove={() => remove(todo.id)}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* ХОРОШО: ID как Key */}
        <div>
          <h3>Good (Unique ID Key)</h3>
          <ul>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                text={todo.task}
                onRemove={() => remove(todo.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
