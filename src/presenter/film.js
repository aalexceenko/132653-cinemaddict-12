import FilmView from "../view/film.js";
import PopUpView from "../view/film-pop-up.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {generateId} from "../utils/common.js";
import {UserAction, UpdateType} from '../const.js';


const Mode = {
  DEFAULT: `DEFAULT`,
  OPEN_POPUP: `OPEN_POPUP`
};


export default class Film {
  constructor(filmListContainerComponent, changeDate, changeMode, api) {
    this._filmListContainerComponent = filmListContainerComponent;
    this._changeData = changeDate;
    this._changeMode = changeMode;
    this._filmComments = null;
    this._api = api;

    this._filmСomponent = null;
    this._filmDetailsComponent = null;

    this._mode = Mode.DEFAULT;

    this._handleOpenPopUpClick = this._handleOpenPopUpClick.bind(this);
    this._handleClosePopUpClick = this._handleClosePopUpClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);

    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleEnterKeyDown = this._handleEnterKeyDown.bind(this);
  }

  init(film) {

    this._film = film;

    this._api.getComments(film.id)
      .then((data) => {
        this._filmComments = data.slice();

      });


    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmView(film);
    this._filmDetailsComponent = new PopUpView(film, this._filmComments);

    this._filmComponent.setOpenPopUpClickkHandler(this._handleOpenPopUpClick);
    this._filmDetailsComponent.setClosePopUpClickHandler(this._handleClosePopUpClick);

    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsComponent.setDeleteButtonClickHandler(this._handleDeleteButtonClick);
    this._filmDetailsComponent.setEnterKeyDown(this._handleEnterKeyDown);


    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmListContainerComponent, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainerComponent.getElement().contains(prevFilmComponent.getElement())) {
      replace(prevFilmComponent, this._filmComponent);

    }

    if (this._filmListContainerComponent.getElement().contains(prevFilmDetailsComponent.getElement())) {
      replace(prevFilmDetailsComponent, this._filmDetailsComponent);

    }

    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailsComponent);
  }

  _openPopup() {
    this._filmDetailsComponent.setFilmComments(this._filmComments);
    this._changeMode();

    this._filmDetailsComponent.updateElement();

    document.querySelector(`body`).classList.add(`hide-overflow`);
    this._filmListContainerComponent.getElement().appendChild(this._filmDetailsComponent.getElement());
    this._filmDetailsComponent.setClosePopUpClickHandler(this._handleClosePopUpClick);

    document.addEventListener(`keydown`, this._onEscKeyDown);
    document.addEventListener(`keydown`, this._handleEnterKeyDown);

    this._mode = Mode.OPEN;
  }

  _closePopup() {
    remove(this._filmDetailsComponent);

    document.querySelector(`body`).classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.removeEventListener(`keydown`, this._handleEnterKeyDown);

    this._mode = Mode.DEFAULT;
    this._filmDetailsComponent.reset(this._film);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();

      this._filmDetailsComponent.reset(this._film);
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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isFavorites: !this._film.isFavorites
            }
        )
    );
  }

  _handleDeleteButtonClick(commentId) {
    const newComments = this._film.comments.filter((comment) => comment !== commentId);
    this._filmComments = this._filmComments.filter((comment) => comment.id !== commentId);

    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              comments: newComments
            },
            {
              deletedIdComment: commentId
            }
        )
    );
  }

  _handleEnterKeyDown(evt) {

    if ((evt.ctrlKey || evt.metaKey) && (evt.key === `Enter`)) {
      const choosenEmoji = this._filmDetailsComponent.returnSelectedEmojiType();
      const messageUser = this._filmDetailsComponent.returnUserMessage();

      if (choosenEmoji && messageUser) {
        const userComment = {
          id: generateId(),
          emotion: choosenEmoji,
          comment: messageUser,
          date: new Date(),
        };

        this._filmComments.push(userComment);

        this._changeData(
            UserAction.ADD_COMMENT,
            UpdateType.MINOR,
            Object.assign(
                {},
                this._film,
                {
                  newComment: userComment
                }
            )
        );
      }
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
      document.querySelector(`body`).classList.add(`hide-overflow`);
    }
  }

}
