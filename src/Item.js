let ID_COUNTER = 1000;

export default class Item {

  constructor(options = {}) {
    this.x = options.x || 0;
    this.y = options.y || 0;
    this.tile = null;
    this.id = (++ID_COUNTER).toString(36);
  }

  render(context, dpr) {
    context.beginPath();
    context.arc(this.x, this.y, dpr(5), 0, Math.PI * 2, false);
    context.closePath();

    context.fillStyle = 'white';
    context.fill();
  }

}
