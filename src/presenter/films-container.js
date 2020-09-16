import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsContainerView from "../view/films-container.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import NoFilmView from "../view/no-film.js";
import FilmPresenter from "./film.js";
import {SortType} from "../const.js";
import {sortFilmDown, sortFilmRating} from "../utils/film.js";
import SortView from "../view/sort.js";
import {UserAction, UpdateType} from '../const.js';
import {render, RenderPosition, remove} from "../utils/render.js";
import {filter} from "../utils/filter.js";


const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(filmsContainer, moviesModel, filterModel) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._filmsContainer = filmsContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._sortComponent = null;
    this._showMoreButtonComponent = null;

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmListComponent = new FilmsListView();
    this._filmListContainerComponent = new FilmsListContainerView();
    this._noFilmComponent = new NoFilmView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    // this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);


  }

  init() {
    // this._renderSort();

    // this._films = films.slice();
    // this._sourceFilms = films.slice();


    // render(this._filmsContainer, this._filmsContainerComponent, RenderPosition.BEFOREEND);
    // render(this._filmsContainerComponent, this._filmListComponent, RenderPosition.BEFOREEND);
    // render(this._filmListComponent, this._filmListContainerComponent, RenderPosition.BEFOREEND);

    // this._renderFilmContainer();

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

    // return this._moviesModel.getFilms();
    return filtredFilms;
  }


  _handleSortTypeChange(sortType) {

    if (this._currentSortType === sortType) {
      return;
    }

    // this._sortFilms(sortType);
    this._currentSortType = sortType;

    this._clearBoard({resetRenderedTaskCount: true});
    this._renderBoard();

    // this._clearFilmList();
    // this._renderFilmList();
  }

  _renderSort() {

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmsContainer, this._sortComponent, RenderPosition.BEFOREEND);

  }

  // _handleFilmChange(updatedFilm) {

  //   // this._films = updateItem(this._films, updatedFilm);
  //   // this._sourceFilms = updateItem(this._sourceFilms, updatedFilm);
  //   this._filmPresenter[updatedFilm.id].init(updatedFilm);
  // }

  _handleViewAction(actionType, updateType, update) {
    // console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._moviesModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._moviesModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._moviesModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    // console.log(updateType, data);

    switch (updateType) {
      case UpdateType.MINOR:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
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

    const filmPresenter = new FilmPresenter(this._filmListContainerComponent, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    // debugger;
    films.forEach((film) => this._renderFilm(film));


    // this._films
    //   .slice(from, to)
    //   .forEach((containerFilm) => this._renderFilm(containerFilm));

  }

  _renderNoFilms() {

    render(this._filmListComponent, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderFilmCount;

    // this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    // this._renderedFilmCount += FILM_COUNT_PER_STEP;

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

    // this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (filmCount > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  // _clearFilmList() {

  //   Object
  //     .values(this._filmPresenter)
  //     .forEach((presenter) => presenter.destroy());
  //   this._filmPresenter = {};
  //   this._renderedFilmCount = FILM_COUNT_PER_STEP;
  // }

  // _renderFilmList() {
  //   this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

  //   if (this._films.length > FILM_COUNT_PER_STEP) {
  //     this._renderShowMoreButton();
  //   }
  // }


  // _renderFilmContainer() {
  //   const films = this._getFilms();
  //   const filmCount = films.length;

  //   if (filmCount === 0) {
  //     this._renderNoFilms();
  //     return;
  //   }
  //   this._renderFilmList();
  // }

  _renderBoard() {
    const films = this._getFilms();
    const filmCount = films.length;
    // console.log(films);

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

