FROM node:alpine as development
WORKDIR /home/node/app
COPY package.json ./
RUN npm i
COPY . .
