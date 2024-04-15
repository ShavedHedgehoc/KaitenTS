FROM node:21-alpine3.18

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./frontend/package*.json ./
COPY ./frontend/tsconfig.json ./
COPY ./frontend/src ./src
COPY ./frontend/public ./public



RUN npm install
RUN npm install serve -g


RUN npm run build
CMD ["serve", "-p","3000", "build/"]

EXPOSE 3000