FROM node as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

COPY proxy.conf  /etc/nginx/conf.d/default.conf
