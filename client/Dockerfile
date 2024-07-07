FROM node:current-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

EXPOSE 80