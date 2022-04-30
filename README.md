# Application gestion des matériels

![Custom badge](https://img.shields.io/endpoint?label=Node&logo=Node.js&message=14.17.6&style=for-the-badge&url=https%3A%2F%2Fnodejs.org%2Fen%2F)

![Custom badge](https://img.shields.io/endpoint?label=React&message=17.2.6&logo=React&style=for-the-badge&url=https%3A%2F%2Freactjs.org)

![Custom badge](https://img.shields.io/endpoint?label=Material%20UI&message=4.11.4&logo=Mui&style=for-the-badge&url=https%3A%2F%2Fmui.com)

![Custom badge](https://img.shields.io/endpoint?label=graphql&logo=graphql&message=15.7.2&style=for-the-badge&url=https%3A%2F%2Fgraphql.org)

![NPM](https://img.shields.io/npm/l/express?label=Express&message=4.17.1&logo=express&style=for-the-badge)

## 🚀 Javascript full-stack 🚀

## Setup

### Dev

```sh
# (Linux) Export UID to fix permissions
export UID

# Boot the stack; this will
# - provision mongo
# - launch api & web
npm run up

# Only run api & web
npm run dev

# Stop containers
npm run stop

# Tear down containers
npm run down
```

### Prod

```sh
# (Linux) Export UID to fix permissions
export UID
# (Linux) Create volume dir with current user
mkdir data

# Build react app
npm run build

# Create env file
cp .env.example .env
# or export into shell
export $(cat /path/to/.env)

# Boot the stack
docker-compose up -d

# View logs
docker-compose logs

# Re-build api & web after changes
docker-compose build api web
```

## MVP

As a user, I can

- sign up / sign in / sign out
- crud users / materiels /details /techniciens
- consulte list of users / materiels / details / technicien

## Next Phase

As a user, I can

- reset pwd
- receive confirmation emails
- edit my profile
- see in realtime other users data's modification
- customize the theme
- upload files materiels images

## features

- use redis for stocking our cache

## Stack

### Backend

- Node + Express
- GraphQL + Apollo Server Express
- MongoDB + Mongoose

### Frontend

- React 17.0.2
- Apollo Client 3.4.16
- Material-UI 4.11.4

### DevOps

- nginx
- Docker + docker-compose

---

![Alt text](./screenshot.png 'Screenshot')

💻 Made by Fanomezantsoa Herifiandry Marc Nico, 30 avril 2022 at 02h 41min. Free to use

Email: ny.kalash@gmail.com

Facebook: Ks Krimi

site web: ks-krimi.github.io

Tel: 032 40 519 20 / 034 82 419 97
