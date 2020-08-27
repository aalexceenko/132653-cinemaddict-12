import AbstractView from "./abstract.js";

const createFilmListExtraCommentTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmListExtraComment extends AbstractView {

  getTemplate() {
    return createFilmListExtraCommentTemplate();
  }

}
