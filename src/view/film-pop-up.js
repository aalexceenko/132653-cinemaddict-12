import {EMOJIS, CLASS_ITEM_ACTIVE} from "../const.js";
import {getDuration} from "../utils/film.js";
import {addClassName} from "../utils/common.js";
// import AbstractView from "./abstract.js";
import SmarttView from "./smart.js";

const EmojiType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

const createGenresTemplate = (genres) => {
  return (
    `<td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
    <td class="film-details__cell">
    ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
    </td>`
  );
};

const createCommentsListTemplate = (comments) => {

  return (
    `<ul class="film-details__comments-list">
    ${(comments).map((comment) => `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-${comment.emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${comment.date.toLocaleString(`en-US`)}</span>
        <button class="film-details__comment-delete data-comment-id ="${comment.id}"">Delete</button>
      </p>
    </div>
  </li>`).join(``)}
  </ul>`
  );
};

const createEmojiList = () => {
  return (
    `<div class="film-details__emoji-list">
    ${EMOJIS.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="${emoji}">
    </label>`).join(``)}
        </div>`
  );
};

const createFilmDetailsTemplate = (film, emoji, message) => {

  const {title, year, origanalTitle, writer, director, age, actors, country, poster, rating, comments, runtime, description, isFavorites, isWatched, isWatchlist, genres} = film;

  const commentsListTemplate = createCommentsListTemplate(comments);
  const emojiList = createEmojiList(EMOJIS, createEmojiList, emoji);
  const genresTemplate = createGenresTemplate(genres);
  const date = `${year.getDate()} ${year.toLocaleString(`en-US`, {month: `long`, year: `numeric`})}`;
  const duration = getDuration(runtime);
  const writers = writer ? writer.join(`, `) : `N/A`;
  const actorsName = actors ? actors.join(`, `) : `N/A`;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">

              <p class="film-details__age">${age}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title || `N/A`}</h3>
                  <p class="film-details__title-original">Original: ${origanalTitle || `N/A`}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director || `N/A`}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actorsName}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${date}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country || `N/A`}</td>
                </tr>
                <tr class="film-details__row">
                  ${genresTemplate || `N/A`}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description || `N/A`}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${addClassName(CLASS_ITEM_ACTIVE, isWatchlist)}">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched ${addClassName(CLASS_ITEM_ACTIVE, isWatched)}">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${addClassName(CLASS_ITEM_ACTIVE, isFavorites)}">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            ${commentsListTemplate}

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${message ? message : ``}</textarea>
              </label>

              ${emojiList}

            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class PopUp extends SmarttView {
  constructor(film) {
    super();

    this._film = film;
    this._emoji = null;
    this._message = null;

    this._closePopUpClickHandler = this._closePopUpClickHandler.bind(this);

    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._setInnerHandler();

  }

  _setInnerHandler() {
    this.getElement()
      .querySelectorAll(`.film-details__emoji-label`)
      .forEach((element) => element.addEventListener(`click`, this._emojiClickHandler));

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);
  }

  restoreHandlers() {
    this._setInnerHandler();
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteButtonClickHandler(this._callback.deleteButtonClick);
    // this.setClickHandler(this._callback.click);
    this.setEnterKeyDown(this._callback.enterKeyDown);

  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    // this.updateData({message: evt.target.value}, true);
    this._message = evt.target.value;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._emoji, this._message);
  }

  setEnterKeyDown(callback) {
    this._callback.enterKeyDown = callback;
  }

  _closePopUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.closePopup();
  }

  setClosePopUpClickHandler(callback) {
    this._callback.closePopup = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopUpClickHandler);

  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.deleteButtonClick = callback;

    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((element) => element.addEventListener(`click`, this._deleteButtonClickHandler));
  }

  _deleteButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteButtonClick(evt.target.dataset.commentId);
    console.log(evt.target.dataset.commentId);
  }

  _emojiClickHandler(evt) {
    this._updateEmoji(evt.target.dataset.emojiType);
    this.updateElement();
  }

  _updateEmoji(emojiType) {
    switch (emojiType) {
      case EmojiType.SMILE:
        this._emoji = EmojiType.SMILE;
        break;
      case EmojiType.SLEEPING:
        this._emoji = EmojiType.SLEEPING;
        break;
      case EmojiType.ANGRY:
        this._emoji = EmojiType.ANGRY;
        break;
      case EmojiType.PUKE:
        this._emoji = EmojiType.PUKE;
        break;
    }
  }

  returnUserMessage() {
    return this._message ? this._message : false;
  }

  reset() {
    this._emoji = null;
    this._message = null;
  }
}
