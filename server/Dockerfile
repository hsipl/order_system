FROM node:latest

WORKDIR /order_system/server

COPY package*.json ./
COPY . . 
RUN npm install yarn
RUN yarn install


EXPOSE 8000