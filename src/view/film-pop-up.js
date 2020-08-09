import {EMOJIS} from "../const.js";
import {getDuration, addClassName} from "../utils.js";

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
    ${comments.map((comment) => `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${comment.date.toLocaleString(`en-US`)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`).join(``)}
  </ul>`
  );
};

const createEmojiList = () => {
  return (
    `<div class="film-details__emoji-list">
    ${EMOJIS.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="smile">
    <label class="film-details__emoji-label" for="emoji-smile">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`).join(``)}
        </div>`
  );
};

export const createFilmDetailsTemplate = (film) => {

  const {title, year, origanalTitle, writer, director, age, actors, country, poster, rating, runtime, description, comments, isFavorites, isWatched, isWatchlist, genres} = film;

  const commentsListTemplate = createCommentsListTemplate(comments);
  const emojiList = createEmojiList();
  const genresTemplate = createGenresTemplate(genres);
  const date = `${year.getDate()} ${year.toLocaleString(`en-US`, {month: `long`, year: `numeric`})}`;
  const duration = getDuration(runtime);

  return (
    `<section class="film-details visually-hidden">
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
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${origanalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writer.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
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
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  ${genresTemplate}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${addClassName(isWatchlist)}">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched ${addClassName(isWatched)}">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${addClassName(isFavorites)}">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            ${commentsListTemplate}

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              ${emojiList}

            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};
