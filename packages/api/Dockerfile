# Build prod image
# FROM node:14.17.6 as builder

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# ENV NODE_ENV=production

# CMD [ "node","-r", "esm", "server.js" ]


# Build dev image
FROM node:14.17.6 as builder-dev

WORKDIR /usr/src/app

COPY . .

CMD [ "nodemon","-r", "esm", "server.js" ]
