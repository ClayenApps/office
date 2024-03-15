FROM node:20-alpine as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .

RUN npm run build:ts

FROM node:20-alpine as serve

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json .

EXPOSE 3000
CMD ["npm", "start"]
