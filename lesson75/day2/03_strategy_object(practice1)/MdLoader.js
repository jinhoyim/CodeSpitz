const MdLoader = class extends Parser {
  constructor(target) {
    super(target);
  }
  _parse(v) {
    this._el.innerHTML = this._parseMD(v);
  }
  _d64(v) {
    return decodeURIComponent(
      atob(v).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
  }
  _parseMD(v) {
    return this._d64(v).split('\n').map(v => {
      let i = 3;
      while (i--) {
        if (v.startsWith('#'.repeat(i + i))) return `<h${i + 1}>${v.substr(i + 1)}</h${i + 1}>`;
      }
      return v;
    }).join('<br>');
  }
}