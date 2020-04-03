FROM node:alpine

MAINTAINER Shingo Hisakawa shingohisakawa@gmail.com

RUN wget --no-check-certificate -O - 'https://github.com/hisashin/Ninja-qPCR-web/archive/master.tar.gz' |tar zxvf - && \
 cd ./Ninja-qPCR-web-master && \
 npm install && \
 npx gulp && \
 npm install forever -g

ADD start.sh /

ENTRYPOINT /start.sh

