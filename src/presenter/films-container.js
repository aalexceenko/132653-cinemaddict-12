import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsContainerView from "../view/films-container.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import NoFilmView from "../view/no-film.js";
import FilmPresenter from "./film.js";
import LoadingView from "../view/loading.js";
import {SortType} from "../const.js";
import {sortFilmDown, sortFilmRating} from "../utils/film.js";
import SortView from "../view/sort.js";
import {UserAction, UpdateType} from '../const.js';
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";


const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(filmsContainer, moviesModel, filterModel, api) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._filmsComments = null;

    this._filmsContainer = filmsContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._isLoading = true;
    this._api = api;


    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmListComponent = new FilmsListView();
    this._filmListContainerComponent = new FilmsListContainerView();
    this._noFilmComponent = new NoFilmView();
    this._loadingComponent = new LoadingView();


    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleModeChange = this._handleModeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);


  }

  init() {

    this._renderBoard();

  }

  _getFilms() {

    const filterType = this._filterModel.getFilter();
    const films = this._moviesModel.getFilms();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE_DOWN:
        return filtredFilms.sort(sortFilmDown);
      case SortType.RATING_DOWN:
        return filtredFilms.sort(sortFilmRating);
    }

    return filtredFilms;
  }


  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clearBoard({resetRenderedTaskCount: true});
    this._renderBoard();
  }

  _renderSort() {

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmsContainer, this._sortComponent, RenderPosition.BEFOREEND);

  }

  _handleViewAction(actionType, updateType, update) {

    switch (actionType) {
      case UserAction.UPDATE_FILM:

        this._api.updateFilm(update).then((response) => {
          this._moviesModel.updateFilm(updateType, response);
        });
        break;
      case UserAction.DELETE_COMMENT:

        this._api.deleteComment(update.deletedIdComment).then(() => {
          this._moviesModel.updateFilm(updateType, update);
        });
        break;
      case UserAction.ADD_COMMENT:

        this._api.addComment(update).then((response) => {
          this._moviesModel.updateFilm(updateType, response);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {

    switch (updateType) {
      case UpdateType.MINOR:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortComponent);
    remove(this._noFilmComponent);
    remove(this._showMoreButtonComponent);
    remove(this._loadingComponent);


    if (resetRenderedTaskCount) {
      this._renderedFilmCount = FILM_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderFilm(film) {

    const filmPresenter = new FilmPresenter(this._filmListContainerComponent, this._handleViewAction, this._handleModeChange, this._api);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {

    render(this._filmListComponent, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._filmListComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }


  _renderShowMoreButton() {

    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }
    this._showMoreButtonComponent = new ShowMoreButtonView();


    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

  }

  _renderFilmList() {

    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILM_COUNT_PER_STEP));

    this._renderFilms(films);

    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }


  _renderBoard() {

    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    render(this._filmsContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    render(this._filmsContainerComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    render(this._filmListComponent, this._filmListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));


    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }

  }

}

