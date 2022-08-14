FROM node:14.18.3-alpine

WORKDIR /usr/src/app

COPY package.json .

COPY prisma ./prisma/

RUN npm install

RUN npm i -g nodemon

COPY . .

CMD npm start