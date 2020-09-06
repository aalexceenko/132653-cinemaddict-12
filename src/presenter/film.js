import FilmView from "../view/film.js";
import PopUpView from "../view/film-pop-up.js";

import {render, RenderPosition, remove, replace} from "../utils/render.js";


export default class Film {
  constructor(filmListContainerComponent, changeDate) {
    this._filmListContainerComponent = filmListContainerComponent;
    this._changeData = changeDate;

    this._filmСomponent = null;
    this._filmDetailsComponent = null;

    this._handleOpenPopUpClick = this._handleOpenPopUpClick.bind(this);
    this._handleClosePopUpClick = this._handleClosePopUpClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
  }

  init(film) {

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmView(film);
    this._filmDetailsComponent = new PopUpView(film);


    this._filmComponent.setOpenPopUpClickkHandler(this._handleOpenPopUpClick);
    this._filmDetailsComponent.setClosePopUpClickHandler(this._handleClosePopUpClick);

    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailElement.setDeleteButtonClickHandler(this._handleDeleteButtonClick);

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmListContainerComponent, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainerComponent.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._filmListContainerComponent.getElement().contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
  }

  _openPopup() {
    document.querySelector(`body`).classList.add(`hide-overflow`);
    this._filmListContainerComponent.getElement().appendChild(this._filmDetailsComponent.getElement());

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopup() {
    document.querySelector(`body`).classList.remove(`hide-overflow`);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handleOpenPopUpClick() {
    this._openPopup();
  }

  _handleClosePopUpClick() {
    this._closePopup();
  }

  _handleWatchListClick() {

    this._changeData(
        Object.assign(
            {},
            this._film,

            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }

  _handleWatchedClick() {

    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorites: !this._film.isFavorites
            }
        )
    );
  }


}
