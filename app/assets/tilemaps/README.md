# How to prepare *Extruded tilemap

1. crop SomeMazeTiles.png to only maze tiles size 
   (for examples it will be size 676x601 px)
2. save it to file. For example SomeTiles_cropped.png
3. look for image: examples tiles have margin from image borders 1px and spaces between tiles 1px
4. Ok. Now run tile-extruder to prepare image for map:
```
# I run it in docker container 
# and app root path is /var/www

$ node_modules/tile-extruder/bin/tile-extruder --tileWidth 24 --tileHeight 24 --input assets/tilemaps/SomeTiles_cropped.png --output assets/tilemaps/SomeTilesExtruded.png --margin 1 --spacing 1
```

5. Now this image may be used in game (look for preloader in GameScene)
