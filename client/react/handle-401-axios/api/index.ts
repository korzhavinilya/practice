import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let isTokenValid = false; 

app.get('/api/data', (req, res) => {
  const reqId = req.query.id || 'unknown';
  
  if (!isTokenValid) {
    console.log(`[Server] ❌ 401 Unauthorized for Request #${reqId}`);
    return res.status(401).json({ message: 'Token expired' });
  }
  
  console.log(`[Server] ✅ 200 OK for Request #${reqId}`);
  setTimeout(() => {
    // Небольшая задержка для реалистичности
    res.json({ id: reqId, data: 'Secret Data' });
  }, 500);
});

// 2. Эндпоинт обновления токена
app.post('/api/refresh', (req, res) => {
  console.log('[Server] 🔄 Refreshing Token...');
  setTimeout(() => {
    isTokenValid = true; // Делаем токен валидным
    res.json({ accessToken: 'new_fake_token_123' });
  }, 1000); // Имитируем долгий запрос (1 сек)
});

// 3. Сброс теста (чтобы снова получить 401)
app.post('/api/reset', (req, res) => {
  isTokenValid = false;
  console.log('[Server] 🛑 Token Invalidated');
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Mock Server running on http://localhost:3000');
});