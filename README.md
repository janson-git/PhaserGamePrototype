![Screenshot](docs/img/screenshot_.png)

Demo: https://janson-git.github.io/PhaserGamePrototype/

## How to start

### A. Using `make` command:
```
# to build/run docker container with node, npm and run http-server
make up
```

```
# to down docker container
make down
```
 

### B. Manually run bash commands one by one:
```
# to build/run docker container with node, npm and run http-server
docker-compose up -d
docker-compose exec node npm install -g http-server
docker-compose exec -d node http-server /var/www/dist
```
---

After completed **A** or **B** open http://localhost:8088 in your browser. Done.

Directory `app` will attached in node conainer `/var/www` and this is web-server root path.


### Used materials

RU - Full info about creation levels for some game
https://habr.com/ru/post/461087/

EN - Basic BSP dungeon generation
http://roguebasin.roguelikedevelopment.org/index.php?title=Basic_BSP_Dungeon_generation

EN - Cellular automate to generate cave-like levels
http://www.roguebasin.com/index.php?title=Cellular_Automata_Method_for_Generating_Random_Cave-Like_Levels
