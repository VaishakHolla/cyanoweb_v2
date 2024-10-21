FROM node:alpine as build-frontend
WORKDIR /app/frontend
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

EXPOSE 3000
RUN npm run build

# Stage 2
FROM nginx:1.17.0-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-frontend /app/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-frontend /app/frontend/build /usr/share/nginx/html
EXPOSE ${REACT_DOCKER_PORT}

CMD nginx -g 'daemon off;'