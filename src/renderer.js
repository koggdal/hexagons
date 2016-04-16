import theme from './theme';

const DPR_VALUE = window.devicePixelRatio || 1;

let canvasElement = null;
let canvasContext = null;
let sizeChangeCallback = function () {};

/**
 * Convert a pixel value to device pixels.
 *
 * @param {number} value The value in "CSS" pixels.
 *
 * @return {number} The value in "device" pixels.
 */
function dpr(value) {
  return DPR_VALUE * value;
}

/**
 * Set the element to use for rendering.
 *
 * @param {HTMLCanvasElement} canvas A canvas element.
 */
function setElement(element) {
  canvasElement = element;
  canvasContext = element.getContext('2d');

  sizeChangeCallback();
}

/**
 * Set the dimensions of the canvas.
 * This also takes device pixel ratio into account.
 *
 * @param {number} width The width of the canvas in "CSS" pixels.
 * @param {number} height The height of the canvas in "CSS" pixels.
 */
function setCanvasSize(width, height) {
  canvasElement.width = dpr(width);
  canvasElement.height = dpr(height);
  canvasElement.style.width = width + 'px';
  canvasElement.style.height = height + 'px';
}

/**
 * Set the dimensions of the canvas to the size of the window and keep it sized
 * accordingly when resizing the window.
 *
 * @param {Function} callback Function to call when the size has changed. This
 *     is also called for the initial setting of dimensions.
 */
function keepSizeToWindow(callback) {
  sizeChangeCallback = callback;

  setCanvasSize(window.innerWidth, window.innerHeight);

  window.addEventListener('resize', () => {
    setCanvasSize(window.innerWidth, window.innerHeight);
  });
}

/**
 * Clear the canvas.
 */
function clear() {
  canvasContext.restore();
  canvasContext.save();

  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

function getContext() {
  return canvasContext;
}

export default {
  dpr,
  setElement,
  keepSizeToWindow,
  clear,
  getContext
};
