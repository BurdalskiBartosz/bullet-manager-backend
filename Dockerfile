FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat chromium

WORKDIR /app

COPY package.json .

COPY prisma ./prisma/

RUN npm install

ENV PATH="/app/node_modules/.bin:$PATH"

COPY . .

WORKDIR /app
RUN npx prisma generate

RUN npm i -g nodemon

CMD npm start