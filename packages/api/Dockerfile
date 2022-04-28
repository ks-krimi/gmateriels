# Build prod image
FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

ENV NODE_ENV=production

CMD [ "node","-r", "esm", "server.js" ]


# Build dev image
FROM node as builder-dev

WORKDIR /usr/src/app

COPY . .

CMD [ "nodemon","-r", "esm", "server.js" ]
