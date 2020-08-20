FROM node:stretch-slim

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y wget && \
    apt-get install -y git && \
    apt-get install -y libpng-dev
RUN yarn global add gulp-cli

COPY .entrypoint.sh /entrypoint.sh

RUN mkdir -p /var/www
WORKDIR /var/www

RUN chmod +x /entrypoint.sh


ENTRYPOINT ["/entrypoint.sh"]