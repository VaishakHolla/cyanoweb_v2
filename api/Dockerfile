FROM node:alpine as build-backend

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD npm start