FROM node:6.9

RUN apt-get update

RUN apt-cache search swig
RUN apt-cache madison swig

RUN mkdir /tcellagent_src

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD ./swig-3.0.11 /app/swig-3.0.11
RUN ls .
RUN cd swig-3.0.11/ && ./configure && make && make install

RUN useradd -ms /bin/bash tcelluser
USER tcelluser
