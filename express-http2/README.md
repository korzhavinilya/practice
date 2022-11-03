Generate key and certificate

```
 openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

article: https://javascript.plainenglish.io/serving-hello-world-with-http2-and-express-js-4dd0ffe76860
