FROM node:carbon

WORKDIR /app
COPY api/package*.json ./
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH

ADD api /app/src
WORKDIR /app/src
RUN npm run build
CMD npm run start