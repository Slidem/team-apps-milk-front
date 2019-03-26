FROM node:11-alpine

ENV SERVICES_HOST 127.0.0.1
ENV AUTH_SERVICE_PORT 8080
ENV MILK_SERVICE_PORT 8082
ENV FRONT_APP_PORT 3000

RUN mkdir -p /home/app
WORKDIR /home/app

COPY . /home/app
COPY docker-entrypoint.sh /home/app/docker-entrypoint.sh

RUN chmod +x /home/app/docker-entrypoint.sh

RUN apk add --no-cache bash
RUN npm install

ENTRYPOINT ["sh", "-c", "/home/app/docker-entrypoint.sh ${SERVICES_HOST} ${AUTH_SERVICE_PORT} ${MILK_SERVICE_PORT} ${FRONT_APP_PORT}"]

CMD []