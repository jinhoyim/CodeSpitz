const ImageLoader = class extends Parser {
  constructor(target) {
    super(target);
  }
  _parse(v) {
    this._el.src = 'data:text/plain;base64,' + v;
  }
}