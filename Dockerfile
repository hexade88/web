FROM node:23-alpine3.20

WORKDIR /app
EXPOSE 8085
COPY ./dist .

RUN npm install
CMD [ "node", "index.js" ]  