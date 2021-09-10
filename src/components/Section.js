export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderedItems
      .then((data) => {
        data.cards.forEach((item) => this._renderer(item, data.owner));
      })

  }

  additem(element) {
    this._container.append(element);
  }

  additemUp(element) {
    this._container.prepend(element);
  }
}
