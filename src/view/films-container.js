import AbstractView from "./abstract.js";

const createFilmsContainerTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return createFilmsContainerTemplate();
  }
}
