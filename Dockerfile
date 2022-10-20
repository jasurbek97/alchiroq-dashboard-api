FROM node:14.17.6-alpine3.11 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm cache clean --force && rm -rf node_modules && npm install

COPY . .

RUN npm run build

FROM node:14.17.6-alpine3.11 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm cache clean --force && rm -rf node_modules && npm install

#COPY . .
COPY .env .env
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
