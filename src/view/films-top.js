import AbstractView from "./abstract.js";

const createFilmListExtraTopTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmListExtraTop extends AbstractView {

  getTemplate() {
    return createFilmListExtraTopTemplate();
  }

}
