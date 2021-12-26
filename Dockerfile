FROM node:15

WORKDIR /usr/src/app

COPY ./package.json ./

COPY ./yarn.lock ./

COPY ./prisma ./prisma

RUN yarn

COPY . . 

RUN yarn build

ENV NODE_ENV production

ENV PORT 8080

EXPOSE 8080

CMD ["yarn", "start"]