# Builder image for prod
FROM node:14.17.6

WORKDIR /usr/src/app

COPY . .

ENV NODE_ENV=production

CMD [ "node","-r", "esm", "server.js" ]


# Builder image for prod
# FROM node:14.17.6

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# ENV NODE_ENV=production

# CMD [ "node","-r", "esm", "server.js" ]
