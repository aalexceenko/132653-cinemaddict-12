import {createHeaderProfileTemplate} from "./view/header.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmElementTemplate} from "./view/film.js";
import {createShowMoreButtonTemplate} from "./view/show-more-button.js";
import {createFilmListExtraTopTemplate} from "./view/films-top.js";
import {createFilmListExtraCommentTemplate} from "./view/films-comment.js";
import {createFilmsStatisticTemplate} from "./view/statistic.js";
import {createFilmDetailsTemplate} from "./view/film-pop-up.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createFilmListTemplate} from "./view/films-list.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/navigation.js";

console.log(generateFilm());

export const FILM_COUNT = 25;
const FILM_COUNT_EXTRA = 2;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill().map(generateFilm);

const filters = generateFilter(films);
console.log(films);
console.log(filters);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createHeaderProfileTemplate(films), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createNavigationTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsContainer = document.querySelector(`.films`);

render(filmsContainer, createFilmListTemplate(), `beforeend`);

const filmListContainer = document.querySelector(`.films-list`);
const filmsListContainer = document.querySelector(`.films-list__container`);


for (let i = 1; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsListContainer, createFilmElementTemplate(films[i]), `beforeend`);
}


if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  render(filmListContainer, createShowMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = filmListContainer.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainer, createFilmElementTemplate(film), `beforeend`));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}


render(filmsContainer, createFilmListExtraTopTemplate(), `beforeend`);
render(filmsContainer, createFilmListExtraCommentTemplate(), `beforeend`);

const filmsListExtraContainers = document.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < filmsListExtraContainers.length; i++) {

  const listExtraContainer = filmsListExtraContainers[i].querySelector(`.films-list__container`);

  for (let j = 0; j < FILM_COUNT_EXTRA; j++) {
    render(listExtraContainer, createFilmElementTemplate(films[j]), `beforeend`);
  }
}

const footerStatistisaContainer = document.querySelector(`.footer__statistics`);
render(footerStatistisaContainer, createFilmsStatisticTemplate(), `beforeend`);

const siteFooterElement = document.querySelector(`footer`);

render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);

