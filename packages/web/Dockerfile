FROM node:14.17.6 as builder

WORKDIR /usr/src/app

COPY . .


FROM nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

COPY proxy.conf  /etc/nginx/conf.d/default.conf


# FROM node:14.17.6 as builder

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm ci

# COPY . .

# RUN npm run build
