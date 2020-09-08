import FilmView from "../view/film.js";
import PopUpView from "../view/film-pop-up.js";
import {generateComment} from "../mock/comments.js";
import {render, RenderPosition, remove, replace} from "../utils/render.js";
import {generateId} from "../utils/common.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  OPEN_POPUP: `OPEN_POPUP`
};


export default class Film {
  constructor(filmListContainerComponent, changeDate, changeMode) {
    this._filmListContainerComponent = filmListContainerComponent;
    this._changeData = changeDate;
    // console.log(this._changeData);
    this._changeMode = changeMode;

    this._filmСomponent = null;
    this._filmDetailsComponent = null;
    this._comments = [];
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

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._comments = generateComment();
    // console.log(this._comments);
    // console.log(film);

    this._filmComponent = new FilmView(film, this._comments);
    this._filmDetailsComponent = new PopUpView(film, this._comments);


    this._filmComponent.setOpenPopUpClickkHandler(this._handleOpenPopUpClick);
    this._filmDetailsComponent.setClosePopUpClickHandler(this._handleClosePopUpClick);

    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmDetailsComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsComponent.setDeleteButtonClickHandler(this._handleDeleteButtonClick);
    // this._filmDetailsComponent.setEmojiClickHandler();
    this._filmDetailsComponent.setEnterKeyDown(this._handleEnterKeyDown);


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
    // console.log(this._film);
    document.querySelector(`body`).classList.add(`hide-overflow`);
    this._filmListContainerComponent.getElement().appendChild(this._filmDetailsComponent.getElement());

    document.addEventListener(`keydown`, this._onEscKeyDown);
    document.addEventListener(`keydown`, this._handleEnterKeyDown);

    this._changeMode();
    this._mode = Mode.OPEN;
  }

  _closePopup() {
    document.querySelector(`body`).classList.remove(`hide-overflow`);
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.removeEventListener(`keydown`, this._handleEnterKeyDown);

    this._mode = Mode.DEFAULT;
    this._filmDetailsComponent.reset(this._film);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      document.removeEventListener(`keydown`, this._handleEnterKeyDown);

    }
  }

  _handleOpenPopUpClick() {
    this._openPopup();
  }

  _handleClosePopUpClick() {
    this._closePopup();
  }

  _handleWatchListClick() {
    // console.log(this._changeData);
    // console.log(this._film);
    // debugger;

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
    console.log(this._changeData);
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

  _handleDeleteButtonClick(commentId) {
    console.log(this._film);
    const newComments = this._film.comments.filter((comment) => comment.id !== commentId);
    this._changeData(Object.assign({}, this._film, {comments: newComments.slice(0)}));
  }

  _handleEnterKeyDown(evt) {

    if (evt.key === `Enter`) {

      // let choosenEmoji = this._filmDetailsComponent.getElement().querySelector(`input[type ='radio']:cheked`).value;
      const choosenEmoji = this._filmDetailsComponent.returnSelectedEmojiType();
      const messageUser = this._filmDetailsComponent.returnUserMessage();


      // let messageUser = this._filmDetailsComponent.getElement().querySelector(`.film-details__comment-input`).value;
      if (choosenEmoji && messageUser) {
        console.log(choosenEmoji);
        let userComment = {
          id: generateId(),
          emoji: `./images/emoji/${choosenEmoji}.png`,
          text: messageUser,
          author: `Anonim`,
          time: new Date(),
        };
        console.log(userComment);
        // console.log(this._film);
        // const newComments = this._film.comments.slice();
        // newComments.push(userComment);
        // this._changeData(
        //     Object.assign(
        //         {},
        //         this._film,
        //         {
        //           comments: newComments.slice()
        //         }
        //     )
        // );
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
