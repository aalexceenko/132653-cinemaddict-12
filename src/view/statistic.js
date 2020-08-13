import {createElement} from "../utils.js";

const createFilmsStatisticTemplate = (films) => {
  return (
    `<p>${films.length} movies inside</p>`
  );
};

export default class Statistics {
  constructor(films) {
    this._element = null;
    this._films = films;
  }

  getTemplate() {
    return createFilmsStatisticTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
