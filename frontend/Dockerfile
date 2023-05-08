FROM node:alpine as build-frontend
WORKDIR /app/frontend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-frontend /app/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-frontend /app/frontend/build /usr/share/nginx/html
EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'