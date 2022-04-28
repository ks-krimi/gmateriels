# Application gestion des matériels

## 🚀 Javascript full-stack 🚀

## Setup

### Dev

```sh
# (Linux) Export UID to fix permissions
export UID

# Boot the stack; this will
# - provision mongo & redis
# - launch api & web
npm run up

# Only run api & web
npm run dev

# Stop containers
npm run stop

# Tear down containers
npm run down
```

## MVP

As a user, I can

- sign up / sign in / sign out / reset pwd
- start a private chat with user(s)
- invite users to a chat / leave a chat
- send messages to other user(s)
- see incoming messages live
- upload files (images, video, text)
- maintain privacy (can't read others chats/msgs)

## Next Phase

As a user, I can

- receive confirmation emails
- edit my profile
- start a public group chat
- see typing indicator
- customize the theme
- upload code snippets

## Stack

### BE

- Node + Express
- GraphQL + Apollo Server Express
- MongoDB + Mongoose

### FE

- React 17.0.2
- Apollo Client 3.4.16
- Material-UI 4.11.4

### DevOps

- nginx
- Docker + docker-compose

---

![Alt text](./screenshot.png 'Screenshot')

💻 Made by Fanomezantsoa Herifiandry Marc Nico, 28 avril 2022 at 10h 04min. Free to use

Email: ny.kalash@gmail.com

Facebook: Ks Krimi

site web: ks-krimi.github.io

Tel: 032 40 519 20 / 034 82 419 97
