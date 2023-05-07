export default class Section {
<<<<<<< HEAD
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
=======
  constructor(containerSelector, renderer) {
>>>>>>> develop
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

<<<<<<< HEAD
  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach((item) => {
=======
  addItem(element, isReverseDirection) {
    isReverseDirection ? this._container.append(element) : this._container.prepend(element);
  }

  renderItems(items) {
    items.forEach((item) => {
>>>>>>> develop
      this._renderer(item);
    });
  }
}
