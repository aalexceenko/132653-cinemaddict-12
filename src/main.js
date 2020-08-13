import HeaderView from "./view/header.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import FilmView from "./view/film.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmListExtraTopView from "./view/films-top.js";
import FilmListExtraCommentView from "./view/films-comment.js";
import StatisticsView from "./view/statistic.js";
import PopUpView from "./view/film-pop-up.js";
import FilmsContainerView from "./view/films-container.js";
import FilmsListView from "./view/films-list.js";
import {generateFilm} from "./mock/film.js";
import {generateFilter} from "./mock/navigation.js";
import {render, RenderPosition} from "./utils.js";

const FILM_COUNT = 20;
const FILM_COUNT_EXTRA = 2;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILM_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new HeaderView(films).getElement(), RenderPosition.BEFOREEND);


render(siteMainElement, new NavigationView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const filmsContainerComponent = new FilmsContainerView();

render(siteMainElement, filmsContainerComponent.getElement(), RenderPosition.BEFOREEND);


const filmListComponent = new FilmsListView();


render(filmsContainerComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFOREEND);

const filmsListContainer = document.querySelector(`.films-list__container`);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmView(film);
  const filmDetailsComponent = new PopUpView(film);

  const openPopup = () => {
    filmListElement.appendChild(filmDetailsComponent.getElement());
  };

  const closePopup = () => {
    filmListElement.removeChild(filmDetailsComponent.getElement());
  };

  filmComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, openPopup);
  filmComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, openPopup);
  filmComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, openPopup);
  filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, closePopup);

  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};


for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmsListContainer, films[i]);
}


if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmCount = FILM_COUNT_PER_STEP;
  const showMoreButtonComponent = new ShowMoreButtonView();
  render(filmsContainerComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmsListContainer, film));

    renderedFilmCount += FILM_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}


render(filmsContainerComponent.getElement(), new FilmListExtraTopView().getElement(), RenderPosition.BEFOREEND);
render(filmsContainerComponent.getElement(), new FilmListExtraCommentView().getElement(), RenderPosition.BEFOREEND);

const filmsListExtraContainers = document.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < filmsListExtraContainers.length; i++) {

  const listExtraContainer = filmsListExtraContainers[i].querySelector(`.films-list__container`);

  for (let j = 0; j < FILM_COUNT_EXTRA; j++) {
    renderFilm(listExtraContainer, films[j]);
  }
}

const footerStatistisaContainer = document.querySelector(`.footer__statistics`);
render(footerStatistisaContainer, new StatisticsView(films).getElement(), RenderPosition.BEFOREEND);


