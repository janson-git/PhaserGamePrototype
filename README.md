## How to start

### A. Using `make` command:
```
# to clone Phaser game engine in lib/phaser dir
make install

# to build/run docker container with node, npm and run http-server
make up
```
 

### B. Manually run bash commands one by one:
```
# to clone Phaser game engine in lib/phaser dir
git clone https://github.com/photonstorm/phaser.git ./app/lib/phaser

# to build/run docker container with node, npm and run http-server
docker-compose up -d
docker-compose exec node npm install -g http-server
docker-compose exec -d node http-server /var/www/dist
```
---

After completed **A** or **B** open http://localhost:8088 in your browser. Done.

Directory `app` will attached in node conainer `/var/www` and this is web-server root path.
