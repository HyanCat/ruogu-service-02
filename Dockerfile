FROM node:alpine

LABEL maintainer="hyancat.cn@gmail.com"

RUN adduser -D -h /docker docker
WORKDIR /docker

COPY ./src /docker

RUN yarn --only=prod

EXPOSE 3000

CMD ["node", "app.js"]
