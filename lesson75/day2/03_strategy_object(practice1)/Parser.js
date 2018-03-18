const Parser = class {
  constructor(target) {
    this._el = document.querySelector(target);
    if (!this._el) throw 'invalid target';
  }
  parse(v) {
    this._parse(v);
  }
  _parse(v) { throw 'override!'; }
};