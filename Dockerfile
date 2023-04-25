FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat chromium

WORKDIR /app

COPY package.json /app

COPY prisma app/prisma/

RUN npm install

COPY . /app

WORKDIR /app

RUN npx prisma generate

RUN npm i -g nodemon

CMD npm start