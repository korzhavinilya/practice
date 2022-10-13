const express = require('express');
const webpush = require('web-push');
const path = require('path');

const publicKey =
  'BO1hnXxjOhpxAZB9tAwV7K2IGSGzC8QBtUBXQ5AwK3F12d7Z2LrQ1M2gaLYCNgVXx1yc5o3c4DawJVI1pkR6izs';

const privateKey = 'RKQGrIv10FOBEFxbsA-xNxI58GHK0IJDEWxeH0evd-E';

webpush.setVapidDetails('mailto:cerber941@gmail.com', publicKey, privateKey);

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ title: 'Push Test' });
  webpush.sendNotification(subscription, payload).catch((error) => {
    console.log(error);
  });
});

app.listen(PORT, () => {
  console.log('Server in running on the port', PORT);
});
