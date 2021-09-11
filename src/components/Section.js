export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items) {
    items.cards.forEach((item) => this._renderer(item, items.owner));
  }

  additem(element) {
    this._container.append(element);
  }

  additemUp(element) {
    this._container.prepend(element);
  }
}
