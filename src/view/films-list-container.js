import AbstractView from "./abstract.js";

const createFilmListContainerTemplate = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsListContainer extends AbstractView {
  getTemplate() {
    return createFilmListContainerTemplate();
  }
}
