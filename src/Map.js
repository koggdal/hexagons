export default class Map {

  constructor() {
    this.tiles = {};
  }

  setTile(column, row, tile) {
    this.tiles[column + ':' + row] = tile;
  }

  removeTile(column, row) {
    delete this.tiles[column + ':' + row];
  }

  hasTile(column, row, tile) {
    return (column + ':' + row) in this.tiles;
  }

  forEach(handler) {
    Object.keys(this.tiles).forEach(tileKey => {
      const parts = tileKey.split(':');
      const column = parseInt(parts[0], 10);
      const row = parseInt(parts[1], 10);
      handler(this.tiles[tileKey], column, row);
    });
  }

}
