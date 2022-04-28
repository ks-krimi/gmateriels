FROM node as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

ENV NODE_ENV=development

CMD [ "nodemon","-r", "esm", "server.js" ]
