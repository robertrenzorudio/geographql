FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./

COPY ./yarn.lock ./

COPY ./prisma ./prisma

RUN yarn

COPY . . 

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080

CMD ["yarn", "start"]
