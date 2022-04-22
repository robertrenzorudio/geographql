FROM node:alpine

WORKDIR /usr/src/app

COPY ./package.json ./

COPY ./yarn.lock ./

COPY ./prisma ./prisma

RUN yarn

COPY . . 

COPY .env.production .env

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080

CMD ["yarn", "start"]