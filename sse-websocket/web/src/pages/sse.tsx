import { FormEvent, useEffect, useState } from 'react';
import Message from '../common/interfaces/message.interface';

export default function ServerSentEvent() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    const eventSource = new EventSource('http://localhost:3001/connect');

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((messages) => [...messages, message]);
    };
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    await fetch('http://localhost:3001/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        id: Date.now(),
        message: input,
      }),
    });

    setInput('');
  }

  return (
    <div>
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
              <li key={message.id}>{message.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
