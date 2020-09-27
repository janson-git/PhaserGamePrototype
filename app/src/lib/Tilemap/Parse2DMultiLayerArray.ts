import Tile = Phaser.Tilemaps.Tile;
import MapData = Phaser.Tilemaps.MapData;
import LayerData = Phaser.Tilemaps.LayerData;
import Formats = Phaser.Tilemaps.Formats;

/**
 * Parses a 2D array of tile indexes into a new MapData object with a single layer.
 *
 * @function Parse2DMultiLayerArray
 * @since 3.0.0
 *
 * @param {string} name - The name of the tilemap, used to set the name on the MapData.
 * @param {integer[][]} layersData - array of layers tile indexes arrays. Every layer is array of integers
 * @param {integer} widthInTiles -
 * @param {integer} heightInTiles -
 * @param {integer} tileWidth - The width of a tile in pixels.
 * @param {integer} tileHeight - The height of a tile in pixels.
 * @param {boolean} insertNull - Controls how empty tiles, tiles with an index of -1, in the map
 * data are handled. If `true`, empty locations will get a value of `null`. If `false`, empty
 * location will get a Tile object with an index of -1. If you've a large sparsely populated map and
 * the tile data doesn't need to change then setting this value to `true` will help with memory
 * consumption. However if your map is small or you need to update the tiles dynamically, then leave
 * the default value set.
 *
 * @return {Phaser.Tilemaps.MapData} The MapData object.
 */
let Parse2DMultiLayerArray = function(name, layersData, widthInTiles, heightInTiles, tileWidth, tileHeight, insertNull)
    {
        let mapData = new MapData({
            name: name,
            tileWidth: tileWidth,
            tileHeight: tileHeight,
            format: Formats.ARRAY_2D, // ?? остаётся так?
        });

        mapData.width = widthInTiles;
        mapData.height = heightInTiles;
        mapData.widthInPixels = widthInTiles * tileWidth;
        mapData.heightInPixels = heightInTiles * tileHeight;

        let layers = [];
        for (let i = 0; i < layersData.length; i++) {
            let tiles = [];
            let height = heightInTiles;
            let width = 0;

            let layerData = new LayerData({
                tileWidth: tileWidth,
                tileHeight: tileHeight
            });

            let data = layersData[i];

            for (let y = 0; y < data.length; y++) {
                tiles[y] = [];
                let row = data[y];

                for (let x = 0; x < row.length; x++) {
                    let tileIndex = parseInt(row[x], 10);

                    if (isNaN(tileIndex) || tileIndex === -1) {
                        tiles[y][x] = insertNull
                            ? null
                            : new Tile(layerData, -1, x, y, tileWidth, tileHeight, tileWidth, tileHeight);
                    } else {
                        tiles[y][x] = new Tile(layerData, tileIndex, x, y, tileWidth, tileHeight, tileWidth, tileHeight);
                    }
                }

                if (width === 0) {
                    width = row.length;
                }
            }

            layerData.width = width;
            layerData.height = height;
            layerData.widthInPixels = width * tileWidth;
            layerData.heightInPixels = height * tileHeight;
            layerData.data = tiles;

            layers.push(layerData);
        }

        mapData.layers = layers;
        return mapData;
    };

export default Parse2DMultiLayerArray;