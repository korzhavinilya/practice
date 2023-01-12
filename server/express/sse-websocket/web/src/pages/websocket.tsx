import { FormEvent, useRef, useState } from 'react';

interface Message {
  id: number;
  message: string;
  username: string;
  event: 'connection' | 'message';
}

export default function Websocket() {
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);

  const ws = useRef<WebSocket | null>(null);

  function connect(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    ws.current = new WebSocket('ws://localhost:3001');

    ws.current.onopen = () => {
      setConnected(true);

      const message = {
        id: Date.now(),
        event: 'connection',
        username,
      };

      ws.current?.send(JSON.stringify(message));
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((messages) => [...messages, message]);
    };

    ws.current.onclose = () => {
      setConnected(false);
    };

    ws.current.onerror = () => {};
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = {
      id: Date.now(),
      event: 'message',
      username,
      message: input,
    };

    ws.current?.send(JSON.stringify(message));

    setInput('');
  }

  if (!connected) {
    return (
      <div>
        <h2>Connection:</h2>
        <form onSubmit={connect}>
          <input
            type="text"
            value={username}
            placeholder="Enter your name"
            onChange={(event) => setUsername(event.target.value)}
          />
          <button disabled={!username}>Send</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Chat:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button disabled={!input}>Send</button>
      </form>

      {messages.length > 0 && (
        <div>
          <h2>Messages:</h2>
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                {message.event === 'connection'
                  ? `${message.username}
                is connected`
                  : `${message.username}: ${message.message}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
