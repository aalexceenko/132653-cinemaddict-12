import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsContainerView from "../view/films-container.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import NoFilmView from "../view/no-film.js";
import FilmPresenter from "./film.js";
import {updateItem} from "../utils/common.js";
import {SortType} from "../const.js";
import {sortFilmDown, sortFilmRating} from "../utils/film.js";
import SortView from "../view/sort.js";

import {render, RenderPosition, remove} from "../utils/render.js";

const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currenSortType = SortType.DEFAULT;
    this._filmPresenter = {};


    this._sortComponent = new SortView();
    this._filmsContainerComponent = new FilmsContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._filmListComponent = new FilmsListView();
    this._filmListContainerComponent = new FilmsListContainerView();
    this._noFilmComponent = new NoFilmView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleFilmChange = this._handleFilmChange.bind(this);

  }

  init(films) {
    this._renderSort();

    this._films = films.slice();
    this._sourceFilms = films.slice();


    render(this._filmsContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmContainer();
  }

  _sortFilms(sortType) {

    switch (sortType) {
      case SortType.DATE_DOWN:
        this._films.sort(sortFilmDown);
        break;
      case SortType.RATING_DOWN:
        this._films.sort(sortFilmRating);
        break;
      default:
        this._films = this._sourceFilms.slice();
    }


    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {

    render(this._filmsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleFilmChange(updatedFilm) {

    console.log(this._films);
    console.log(145);
    this._films = updateItem(this._films, updatedFilm);
    this._sourceFilms = updateItem(this._sourceFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderFilm(film) {

    const filmPresenter = new FilmPresenter(this._filmListContainerComponent, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {

    this._films
      .slice(from, to)
      .forEach((containerFilm) => this._renderFilm(containerFilm));

  }

  _renderNoFilms() {

    render(this._filmListComponent, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }



  _renderShowMoreButton() {

    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {

    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _clearFilmList() {
    // this._filmListContainerComponent.getElement().innerHTML = ``;
    console.log(Object.values(this._filmPresenter));
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }


  _renderFilmContainer() {

    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmList();
  }
}
