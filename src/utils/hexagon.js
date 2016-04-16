import renderer from '../renderer';

const dpr = renderer.dpr;

function hexToCube(hex) {
  return {x: hex.column, y: -hex.column - hex.row, z: hex.row};
}

function cubeToHex(cube) {
  return {column: cube.x, row: cube.z};
}

function cubeRound(cube) {
  let rx = Math.round(cube.x);
  let ry = Math.round(cube.y);
  let rz = Math.round(cube.z);

  const xDiff = Math.abs(rx - cube.x);
  const yDiff = Math.abs(ry - cube.y);
  const zDiff = Math.abs(rz - cube.z);

  if (xDiff > yDiff && xDiff > zDiff) {
    rx = -ry-rz;
  } else if (yDiff > zDiff) {
    ry = -rx-rz;
  } else {
    rz = -rx-ry;
  }

  return {x: rx, y: ry, z: rz};
}

function hexRound(hex) {
  return cubeToHex(cubeRound(hexToCube(hex)));
}

function positionToHex(pos, hexagonSize) {
  return hexRound({
    column: dpr(pos.x) * 2/3 / dpr(hexagonSize),
    row: (-dpr(pos.x) / 3 + Math.sqrt(3)/3 * dpr(pos.y)) / dpr(hexagonSize)
  });
}

function hexToPosition(hex, hexagonSize) {
  return {
    x: dpr(hexagonSize * 3/2 * hex.column),
    y: dpr(hexagonSize * Math.sqrt(3) * (hex.row + hex.column / 2))
  };
}

export default {
  hexToCube,
  cubeToHex,
  cubeRound,
  hexRound,
  positionToHex,
  hexToPosition
}