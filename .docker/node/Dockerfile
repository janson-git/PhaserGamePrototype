FROM ubuntu:18.04

RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends wget git npm libpng-dev ca-certificates
RUN npm install --global gulp-cli && npm install --global yarn
RUN npm install -g n && n 10.15.0
RUN ln -sf /usr/local/n/versions/node/10.15.0/bin/node /usr/bin/nodejs && ln -sf /usr/local/n/versions/node/10.15.0/bin/node /usr/bin/node

COPY .entrypoint.sh /entrypoint.sh

RUN mkdir -p /var/www
WORKDIR /var/www

RUN chmod +x /entrypoint.sh


ENTRYPOINT ["/entrypoint.sh"]