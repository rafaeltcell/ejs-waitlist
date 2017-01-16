FROM node:wheezy

RUN apt-get update

RUN mkdir /tcellagent_src

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN useradd -ms /bin/bash tcelluser
USER tcelluser
