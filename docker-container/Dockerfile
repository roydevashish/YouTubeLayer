FROM node:18-alpine

RUN apk update
RUN apk upgrade

WORKDIR /app

COPY index.js .
COPY .env .
COPY credentials.json .
COPY tokens.json .
COPY package.json .

RUN npm install

CMD ["npm", "start"]