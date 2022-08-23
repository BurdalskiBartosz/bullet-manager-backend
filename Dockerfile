FROM node:14.18.3-alpine

WORKDIR /usr/src/app

COPY package.json .

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm i -g nodemon

CMD npm start