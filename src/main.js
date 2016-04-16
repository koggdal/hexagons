import theme from './theme';
import renderer from './renderer';
import Mouse from './Mouse';
import Hexagon from './Hexagon';
import hexagonUtils from './utils/hexagon';
import Map from './Map';

const dpr = renderer.dpr;
const mouse = new Mouse();
const hexagonSize = 20;
let initialized = false;

document.body.style.backgroundColor = theme.backgroundColor;

renderer.setElement(document.getElementById('canvas'));

renderer.keepSizeToWindow(() => {
  render();
});

function createHexagon(column, row) {
  const {x, y} = hexagonUtils.hexToPosition({column, row}, hexagonSize);
  return new Hexagon({
    x: x,
    y: y,
    size: dpr(hexagonSize)
  });
}

function addHexagon(map, column, row) {
  map.setTile(column, row, createHexagon(column, row));
}

const map = new Map();

addHexagon(map, 0, 0);
addHexagon(map, 0, 1);
addHexagon(map, 0, 2);
addHexagon(map, 1, 0);
addHexagon(map, 1, 1);
addHexagon(map, 2, 1);
addHexagon(map, 3, 0);
addHexagon(map, 4, 0);
addHexagon(map, 5, -1);
addHexagon(map, 6, -1);
addHexagon(map, 7, -2);
addHexagon(map, 7, -3);
addHexagon(map, 8, -4);
addHexagon(map, 8, -3);
addHexagon(map, 8, -2);
addHexagon(map, 2, 2);
addHexagon(map, 3, 1);
addHexagon(map, 4, 1);
addHexagon(map, 5, 0);
addHexagon(map, 6, 0);
addHexagon(map, 1, 3);
addHexagon(map, 2, 3);
addHexagon(map, 3, 2);
addHexagon(map, 4, 2);
addHexagon(map, 5, 1);
addHexagon(map, 6, 1);
addHexagon(map, 7, 0);
addHexagon(map, 0, 4);
addHexagon(map, 1, 4);
addHexagon(map, 2, 4);
addHexagon(map, 3, 3);
addHexagon(map, 4, 3);
addHexagon(map, 5, 2);
addHexagon(map, 6, 2);
addHexagon(map, 7, 1);
addHexagon(map, 8, 0);
addHexagon(map, 0, 5);
addHexagon(map, 1, 5);
addHexagon(map, 2, 4);
addHexagon(map, 3, 4);
addHexagon(map, 4, 3);
addHexagon(map, 5, 3);
addHexagon(map, 6, 2);
addHexagon(map, 7, 2);
addHexagon(map, 8, 1);
addHexagon(map, 0, 6);
addHexagon(map, 1, 6);
addHexagon(map, 2, 5);
addHexagon(map, 3, 5);
addHexagon(map, 4, 4);
addHexagon(map, 5, 4);
addHexagon(map, 6, 3);
addHexagon(map, 7, 3);
addHexagon(map, 8, 2);
addHexagon(map, 0, 7);
addHexagon(map, 1, 7);
addHexagon(map, 2, 6);
addHexagon(map, 3, 6);
addHexagon(map, 4, 5);
addHexagon(map, 5, 5);
addHexagon(map, 6, 4);
addHexagon(map, 7, 4);
addHexagon(map, 8, 3);

function render() {
  if (!initialized) return;

  const context = renderer.getContext();
  const dpr = renderer.dpr;

  renderer.clear();

  const edgeOffset = 100;

  context.save();
  context.translate(dpr(edgeOffset), dpr(edgeOffset));

  const mouseHex = hexagonUtils.positionToHex(
    {x: mouse.x - edgeOffset, y: mouse.y - edgeOffset}, hexagonSize
  );

  map.forEach((tile, column, row) => {
    const isMouseColumn = column === mouseHex.column;
    const isMouseRow = row === mouseHex.row
    tile.render(context, dpr, isMouseColumn && isMouseRow);
  });

  context.restore();
}

function tick() {
  requestAnimationFrame(tick);

  render();
}

initialized = true;
tick();
