FROM nginx:1.26

WORKDIR /app
EXPOSE 8085

COPY ./default.conf /etc/nginx/nginx.conf
COPY ./dist .
