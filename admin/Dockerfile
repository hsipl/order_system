FROM node:latest

WORKDIR /order_system/admin

COPY package.json .

RUN npm install yarn
RUN yarn install

COPY . .

EXPOSE 3000