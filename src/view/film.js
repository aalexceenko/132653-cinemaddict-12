import {getDuration, getYearFromDate} from "../utils/film.js";
import {addClassName} from "../utils/common.js";
import {CLASS_ITEM_ACTIVE} from "../const.js";
import AbstractView from "./abstract.js";

const MAX_DESCRIPTION_LENGTH = 140;

const createFilmElementTemplate = (film) => {
  const {title, poster, rating, year, runtime, genres, description, comments, isWatchlist, isWatched, isFavorites} = film;

  const duration = getDuration(runtime);
  const yearFilm = getYearFromDate(year);
  let descriptionText = description ? description : `N/A`;
  if (descriptionText.length > MAX_DESCRIPTION_LENGTH) {
    descriptionText = descriptionText.slice(0, MAX_DESCRIPTION_LENGTH - 1) + `…`;
  }

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title || `N/A`}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${yearFilm}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0] || `N/A`}</span>
      </p>
      <img src="./${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionText}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${addClassName(CLASS_ITEM_ACTIVE, isWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${addClassName(CLASS_ITEM_ACTIVE, isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${addClassName(CLASS_ITEM_ACTIVE, isFavorites)}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Film extends AbstractView {
  constructor(film) {
    super();

    this._film = film;

    this._openPopUpClickHandler = this._openPopUpClickHandler.bind(this);

    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmElementTemplate(this._film);
  }

  _openPopUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.openPopup();
  }

  setOpenPopUpClickkHandler(callback) {
    this._callback.openPopup = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._openPopUpClickHandler);
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._openPopUpClickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._openPopUpClickHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }
}
