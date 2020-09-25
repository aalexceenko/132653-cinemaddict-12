import AbstractView from "./abstract.js";

const createFilmsStatisticTemplate = (films) => {
  return (
    `<p>${films.length} movies inside</p>`
  );
};

export default class Statistics extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmsStatisticTemplate(this._films);
  }
}
