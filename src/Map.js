import hexagonUtils from './utils/hexagon';
import theme from './theme';

const hexagonSize = theme.hexagonSize;

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

  getHex(key) {
    const parts = key.split(':');
    const column = parseInt(parts[0], 10);
    const row = parseInt(parts[1], 10);
    return {column, row};
  }

  getTileAtHex(hex) {
    return this.tiles[hex.column + ':' + hex.row];
  }

  forEach(handler) {
    Object.keys(this.tiles).forEach(tileKey => {
      const {column, row} = this.getHex(tileKey);
      handler(this.tiles[tileKey], column, row);
    });
  }

  setItemAtTile(column, row, item) {
    const tile = this.tiles[column + ':' + row];
    if (tile) {
      if (item.tile) {
        item.tile.removeItem();
      }

      tile.setItem(item);
    }
  }

  getSortedTiles() {
    return Object.keys(this.tiles).sort((a, b) => {
      const hexA = this.getHex(a);
      const hexB = this.getHex(b);
      const posA = hexagonUtils.hexToPositionY(hexA, hexagonSize);
      const posB = hexagonUtils.hexToPositionY(hexB, hexagonSize);

      if (posA === posB) {
        return hexB.column - hexA.column;
      }

      return posB - posA;
    }).map(key => this.tiles[key]);
  }

  findNextDown(sourceHex) {
    let currentHex = sourceHex;
    let nextHex = currentHex;

    while (true) {
      nextHex = hexagonUtils.adjacentHex(nextHex, 'down');
      const nextTile = this.getTileAtHex(nextHex);

      if (nextTile) {
        if (nextTile.item) {
          return currentHex;
        }
        currentHex = nextHex;
      } else {
        nextHex = currentHex;
        break;
      }
    }

    return nextHex;
  }

  findNextDownRight(sourceHex) {
    const nextHex = hexagonUtils.adjacentHex(sourceHex, 'down-right');
    const nextTile = this.getTileAtHex(nextHex);
    return (nextTile && !nextTile.item) ? nextHex : sourceHex;
  }

  findNextDownLeft(sourceHex) {
    const nextHex = hexagonUtils.adjacentHex(sourceHex, 'down-left');
    const nextTile = this.getTileAtHex(nextHex);
    return (nextTile && !nextTile.item) ? nextHex : sourceHex;
  }

  addMovement(movements, item, sourceHex, targetHex) {
    const itemId = item.id;

    if (!movements[itemId]) {
      movements[itemId] = [];
    }

    movements[itemId].push({
      item: item,
      sourceHex: sourceHex,
      targetHex: targetHex
    });
  }

  fall() {
    const movements = {};

    this.getSortedTiles().forEach(sourceTile => {
      if (sourceTile.item) {
        const item = sourceTile.item;
        const itemId = sourceTile.item.id;

        let sourceHex = {column: sourceTile.column, row: sourceTile.row};
        let prevHex = sourceHex;
        let nextHex = sourceHex;

        prevHex = nextHex;
        nextHex = this.findNextDown(prevHex);
        if (!hexagonUtils.isSameHex(nextHex, prevHex)) {
          this.addMovement(movements, item, prevHex, nextHex);
        } else {
          prevHex = nextHex;
          nextHex = this.findNextDownRight(prevHex);
          if (!hexagonUtils.isSameHex(nextHex, prevHex)) {
            this.addMovement(movements, item, prevHex, nextHex);
          } else {
            prevHex = nextHex;
            nextHex = this.findNextDownLeft(prevHex);
            if (!hexagonUtils.isSameHex(nextHex, prevHex)) {
              this.addMovement(movements, item, prevHex, nextHex);
            }
          }
        }
      }
    });

    const ids = Object.keys(movements);

    if (ids.length > 0) {
      ids.forEach(id => {
        movements[id].forEach((movement, index) => {
          const {sourceHex, targetHex, item} = movement;
          this.setItemAtTile(targetHex.column, targetHex.row, item);
        });
      });

      setTimeout(() => {
        this.fall();
      }, 500);
    }
  }

}
