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


const FILM_COUNT = 5;
const FILM_COUNT_EXTRA = 2;


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createHeaderProfileTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createNavigationTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsContainer = document.querySelector(`.films`);

render(filmsContainer, createFilmListTemplate(), `beforeend`);

const filmListContainer = document.querySelector(`.films-list`);
const filmsListContainer = document.querySelector(`.films-list__container`);


for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListContainer, createFilmElementTemplate(), `beforeend`);
}

render(filmListContainer, createShowMoreButtonTemplate(), `beforeend`);

render(filmsContainer, createFilmListExtraTopTemplate(), `beforeend`);
render(filmsContainer, createFilmListExtraCommentTemplate(), `beforeend`);

const filmsListExtraContainers = document.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < filmsListExtraContainers.length; i++) {

  const listExtraContainer = filmsListExtraContainers[i].querySelector(`.films-list__container`);

  for (let j = 0; j < FILM_COUNT_EXTRA; j++) {
    render(listExtraContainer, createFilmElementTemplate(), `beforeend`);
  }
}

const footerStatistisaContainer = document.querySelector(`.footer__statistics`);
render(footerStatistisaContainer, createFilmsStatisticTemplate(), `beforeend`);

const siteFooterElement = document.querySelector(`footer`);

render(siteFooterElement, createFilmDetailsTemplate(), `afterend`);
