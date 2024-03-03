FROM node:20-alpine as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

RUN npm run build:ts

EXPOSE 3000
CMD ["npm", "start"]
