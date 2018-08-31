FROM node:6

RUN apt-get update

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN npm install pm2 -g
