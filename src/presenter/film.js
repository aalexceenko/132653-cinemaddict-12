import FilmView from "../view/film.js";
import PopUpView from "../view/film-pop-up.js";

import {render, RenderPosition, remove} from "../utils/render.js";


export default class Film {
  constructor(filmListContainerComponent) {
    this._filmListContainerComponent = filmListContainerComponent;
    this._filmСomponent = null;
    this._filmDetailsComponent = null;

    this._handleOpenPopUpClick = this._handleOpenPopUpClick.bind(this);
    this._handleClosePopUpClick = this._handleClosePopUpClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(film) {
    this._filmComponent = new FilmView(film);
    this._filmDetailsComponent = new PopUpView(film);


    this._filmComponent.setOpenPopUpClickkHandler(this._handleOpenPopUpClick);
    this._filmDetailsComponent.setClosePopUpClickHandler(this._handleClosePopUpClick);

    render(this._filmListContainerComponent, this._filmComponent, RenderPosition.BEFOREEND);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
  }

  _openPopup() {
    this._filmListContainerComponent.getElement().appendChild(this._filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopup() {
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
    console.log(1);
  }

  _handleClosePopUpClick() {
    console.log(2);
    this._closePopup();
    console.log(3);

  }


}
