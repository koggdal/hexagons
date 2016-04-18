export default class Hexagon {

  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.column = options.column || 0;
    this.row = options.row || 0;
    this.size = options.size || 0;
    this.item = null;
  }

  setItem(item) {
    this.item = item;
    item.x = this.x;
    item.y = this.y;
    item.tile = this;
  }

  removeItem() {
    if (this.item) {
      this.item.tile = null;
      this.item = null;
    }
  }

  cornerAngle(i) {
    const angleDeg = 60 * i;
    const angleRad = Math.PI / 180 * angleDeg;
    return angleRad;
  }

  cornerPosX(i) {
    return this.x + this.size * Math.cos(this.cornerAngle(i));
  }

  cornerPosY(i) {
    return this.y + this.size * Math.sin(this.cornerAngle(i));
  }

  render(context, dpr, useFill) {
    context.beginPath();
    context.moveTo(this.cornerPosX(0), this.cornerPosY(0));
    for (let i = 1; i < 6; i++) {
      context.lineTo(this.cornerPosX(i), this.cornerPosY(i));
    }
    context.closePath();

    context.lineWidth = dpr(2);
    context.strokeStyle = 'red';
    context.stroke();

    if (useFill) {
      context.fillStyle = 'red';
      context.fill();
    } else {
      context.fillStyle = '#300';
      context.fill();
    }
  }

}
