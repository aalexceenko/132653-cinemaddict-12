import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsContainerView from "../view/films-container.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import NoFilmView from "../view/no-film.js";
import FilmPresenter from "./film.js";
// import {updateItem} from "../utils/common.js";
import {SortType} from "../const.js";
import {sortFilmDown, sortFilmRating} from "../utils/film.js";
import SortView from "../view/sort.js";
import {UserAction, UpdateType} from '../const.js';
import {render, RenderPosition, remove} from "../utils/render.js";

const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(filmsContainer, moviesModel) {
    this._moviesModel = moviesModel;
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

    // this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);


  }

  init() {
    this._renderSort();

    // this._films = films.slice();
    // this._sourceFilms = films.slice();


    render(this._filmsContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmContainer();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE_DOWN:
        return this._moviesModel.getFilms().slice().sort(sortFilmDown);
      case SortType.RATING_DOWN:
        return this._moviesModel.getFilms().slice().sort(sortFilmRating);
    }

    return this._moviesModel.getFilms();
  }

  // _sortFilms(sortType) {

  //   switch (sortType) {
  //     case SortType.DATE_DOWN:
  //       this._films.sort(sortFilmDown);
  //       break;
  //     case SortType.RATING_DOWN:
  //       this._films.sort(sortFilmRating);
  //       break;
  //     default:
  //       this._films = this._sourceFilms.slice();
  //   }


  //   this._currentSortType = sortType;
  // }

  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    // this._sortFilms(sortType);
    this._currentSortType = sortType;

    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {

    render(this._filmsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  // _handleFilmChange(updatedFilm) {

  //   // this._films = updateItem(this._films, updatedFilm);
  //   // this._sourceFilms = updateItem(this._sourceFilms, updatedFilm);
  //   this._filmPresenter[updatedFilm.id].init(updatedFilm);
  // }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._moviesModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._filmPresenter[data.id].init(data);
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderFilm(film) {

    const filmPresenter = new FilmPresenter(this._filmListContainerComponent, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._filmListContainerComponent, film));


    // this._films
    //   .slice(from, to)
    //   .forEach((containerFilm) => this._renderFilm(containerFilm));

  }

  _renderNoFilms() {

    render(this._filmListComponent, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderFilmCount = Math.min(filmCount, this._renderFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderFilmCount, newRenderFilmCount);

    this._renderFilms(films);
    this._renderFilmCount = newRenderFilmCount;

    // this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    // this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderFilmCount >= this._films.length) {
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
    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmList();
  }
}
