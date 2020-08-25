import FilmView from "../view/film.js";
import ShowMoreButtonView from "../view/show-more-button.js";
// import FilmListExtraTopView from "./view/films-top.js";
// import FilmListExtraCommentView from "./view/films-comment.js";

import PopUpView from "../view/film-pop-up.js";
import FilmsContainerView from "../view/films-container.js";
import FilmsListView from "../view/films-list.js";
import NoFilmView from "../view/no-film.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const FILM_COUNT_PER_STEP = 5;

export default class Container {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._filmsContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._filmListComponent = new FilmsListView();
    this._noFilmComponent = new NoFilmView();
  }

  init(containerFilms) {
    this._containerFilms = containerFilms.slice();

    this._renderFilmContainer();
  }


  _renderFilm(film) {

    const filmsListContainer = document.querySelector(`.films-list__container`);
    const filmComponent = new FilmView(film);
    const filmDetailsComponent = new PopUpView(film);

    const openPopup = () => {
      filmsListContainer.appendChild(filmDetailsComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const closePopup = () => {
      filmsListContainer.removeChild(filmDetailsComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        if (document.querySelector(`.film-details`)) {
          evt.preventDefault();
          closePopup();
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      }
    };


    filmComponent.setOpenPopUpClickkHandler(() => openPopup());
    filmDetailsComponent.setClosePopUpClickHandler(() => closePopup());


    render(filmsListContainer, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {

    this._containerFilms
      .slice(from, to)
      .forEach((containerFilm) => this._renderFilm(containerFilm));

  }

  _renderNoFilms() {

    render(this._filmListComponent, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {

    let renderedFilmCount = FILM_COUNT_PER_STEP;

    render(this._filmsContainerComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    const filmsListContainer = document.querySelector(`.films-list__container`);

    this._showMoreButtonComponent.setClickHandler(() => {

      this._containerFilms
        .slice(renderedFilmCount, renderedFilmCount + FILM_COUNT_PER_STEP)
        .forEach((film) => this._renderFilm(filmsListContainer, film));

      renderedFilmCount += FILM_COUNT_PER_STEP;

      if (renderedFilmCount >= this._containerFilms.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _renderFilmList() {

    this._renderFilms(0, Math.min(this._containerFilms.length, FILM_COUNT_PER_STEP));


    if (this._containerFilms.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmContainer() {

    if (this._containerFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderFilmList();
  }
}
