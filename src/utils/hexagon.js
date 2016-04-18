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

function hexToPositionX(hex, hexagonSize) {
  return dpr(hexagonSize * 3/2 * hex.column);
}

function hexToPositionY(hex, hexagonSize) {
  return dpr(hexagonSize * Math.sqrt(3) * (hex.row + hex.column / 2));
}

function hexToPosition(hex, hexagonSize) {
  return {
    x: hexToPositionX(hex, hexagonSize),
    y: hexToPositionY(hex, hexagonSize)
  };
}

function adjacentHex(hex, direction) {
  switch (direction) {

  case 'up-left':
    return {column: hex.column - 1, row: hex.row - 0};
  
  case 'up':
    return {column: hex.column, row: hex.row - 1};
  
  case 'up-right':
    return {column: hex.column + 1, row: hex.row - 1};
  
  case 'down-right':
    return {column: hex.column + 1, row: hex.row};
  
  case 'down':
    return {column: hex.column, row: hex.row + 1};
  
  case 'down-left':
    return {column: hex.column - 1, row: hex.row + 1};

  }
}

function isSameHex(a, b) {
  return a.column === b.column && a.row === b.row;
}

export default {
  hexToCube,
  cubeToHex,
  cubeRound,
  hexRound,
  positionToHex,
  hexToPosition,
  hexToPositionX,
  hexToPositionY,
  adjacentHex,
  isSameHex
}