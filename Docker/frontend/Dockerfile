FROM node:21-alpine3.18 as build-step

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./frontend/package*.json ./
COPY ./frontend/tsconfig.json ./
COPY ./fromtend/src ./src



RUN npm install
# RUN npm install serve -g


RUN npm run build


# CMD ["serve", "-p","3000", "build/"]

# EXPOSE 3000

FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY ./frontend/nginx.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]