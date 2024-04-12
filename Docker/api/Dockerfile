FROM node:21-alpine3.18

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./api/package*.json ./
COPY ./api/tsconfig.json ./
COPY ./api/src ./src
COPY ./api/.env ./


RUN npm install
RUN npm install pm2 -g


RUN npm run build
CMD ["pm2-runtime", "./dist/index.js"]

EXPOSE 5000