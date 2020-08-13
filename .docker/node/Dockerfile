FROM ubuntu:18.04

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y wget
RUN apt-get install -y git
RUN apt-get install -y npm
#RUN apt-get install -y nodejs-legacy
RUN apt-get install -y libpng-dev
RUN npm install --global gulp-cli
RUN npm install --global yarn

RUN npm install -g n
RUN n 10.15.0
RUN ln -sf /usr/local/n/versions/node/10.15.0/bin/node /usr/bin/nodejs
RUN ln -sf /usr/local/n/versions/node/10.15.0/bin/node /usr/bin/node

#RUN npm cache clean -f
#RUN npm install -g npm

#RUN ls && pwd
COPY .entrypoint.sh /entrypoint.sh

RUN mkdir -p /var/www
WORKDIR /var/www

RUN chmod +x /entrypoint.sh


ENTRYPOINT ["/entrypoint.sh"]