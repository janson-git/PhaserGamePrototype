## How to start

### A. Using `make` command:
0. `make install` to clone Phaser game engine in lib/phaser dir
1. `make up` to build/run docker container with node, npm and run http-server
2. directory `app` will attached in node conainer `/var/www` and this is web-server root path 

### B. Manually run bash commands one by one:
```
git clone https://github.com/photonstorm/phaser.git ./app/lib/phaser
docker-compose up -d
docker-compose exec node npm install -g http-server
docker-compose exec -d node http-server /var/www
```
---

After completed **A** or **B** open http://localhost:8088 in your browser. Done.