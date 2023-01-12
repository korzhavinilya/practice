# JWT Auth React + Express

[Guide](https://www.youtube.com/watch?v=fN25fMQZ2v0&t=9s&ab_channel=UlbiTV)

## JWT

JSON Web Tokens for authorization (check if a user has access to protected resourse by role), not authentification
contains 3 parts:

- header - contains algorithm and token type
- payload - useful data (username, id, roles)
- signature - contains hashed base64(header) + "." + base64(payload) data and signed with a secret key

### Refresh token

There 2 types of tokens:

- access - lives for 15-30m or 1-3 days. Usually is stored in the localStorage
- refresh - lives for 15-60 days. Usually is stored in the httpOnly cookie

### Lifecycle

1. client passes {email, password}
2. server generates {accessToke, refreshToken} and returns the accessToken in a body, refresh in cookie
3. client requests GET /api/messages Authorization: {accessToken}
4. server validates the accessToken
   - if it's valid, returns a response
   - if not, returns 401
5. client has interceptor on 401, requests POST /api/refresh cookie contains the refreshToken
6. server validates the refreshToken and returns a new pair {accessToke, refreshToken}

## Server

### Hash vs Encryption password

We can't enhash hashed password back

### Steps

- npm i express cors cookie-parser
- npm i -D nodemon
- npm i dotenv
- npm i mongodb mongoose
- go to mongodb atlas and create a new db
- npm i jsonwebtoken bcrypt uuid
- npm i nodemailer
- go to gmail settings, enable imap (mail access protocol)
- if 2-step verification is on, go to gmail app passwords and generate a new one, instead of main pass
- npm i express-validator


## Client

### Steps

- npm i mobx mobx-react-lite axios @types/axios