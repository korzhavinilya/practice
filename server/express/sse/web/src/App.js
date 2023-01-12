import React, { useState, useEffect } from 'react';
import './App.css';

const BASE_URL = 'localhost:3000';

function App() {
  const [status, setStatus] = useState('idle');
  const [stockPrices, setStockPrices] = useState([]);
  const [messages, setMessages] = useState([]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('us-EN', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'narrowSymbol',
    }).format(price);
  };

  const fetchStockPrice = () => {
    setStatus('idle');
    fetch(`http://${BASE_URL}/stocks`, { method: 'GET' })
      .then((res) => (res.status === 200 ? res.json() : setStatus('rejected')))
      .then((result) => setStockPrices(result.data))
      .catch((err) => setStatus('rejected'));
  };

  const updateStockPrices = (data) => {
    const parsedData = JSON.parse(data);
    setStockPrices((stockPrices) =>
      [...stockPrices].map((stock) => {
        if (stock.id === parsedData.id) {
          return parsedData;
        }
        return stock;
      })
    );
  };

  useEffect(() => {
    fetchStockPrice();
    const eventSource = new EventSource(`http://${BASE_URL}/realtime-price`);
    eventSource.onmessage = (e) => updateStockPrices(e.data);

    const socket = new WebSocket(`ws://${BASE_URL}`);

    socket.addEventListener('open', (event) => {
      console.log('Connected to ws');
    });

    socket.addEventListener('message', (event) => {
      console.log(event.data);
      // const message = JSON.stringify(event.data);
      // setMessages((messages) => messages.push(message));
    });
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="App">
      <table>
        <caption>Stock Prices</caption>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Ticker Symbol</th>
            <th>Real Time Price</th>
          </tr>
        </thead>
        <tbody>
          {stockPrices.map(({ id, ticker, price }, index) => (
            <tr key={id}>
              <td>{index + 1}</td>
              <td>{ticker}</td>
              <td>{formatPrice(price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
