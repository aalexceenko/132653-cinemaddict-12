import {createElement} from "../utils.js";

const createFilmListExtraCommentTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmListExtraComment {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListExtraCommentTemplate();
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
