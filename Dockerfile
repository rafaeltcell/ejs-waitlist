FROM node:wheezy

RUN mkdir /tcellagent_src

ENV APP_HOME /ejs-waitlist
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
