import {getDuration} from "../utils.js";


const checkLenghtText = (arr) => {
  let newArrayLength = arr.join().length;

  if (newArrayLength >= 140) {
    arr = arr.join(`  `).slice(0, 138);
    arr += `...`;
  }

  return arr;
};

export const createFilmElementTemplate = (film) => {

  const {title, poster, rating, year, runtime, genres, description, comments, isWatchlist, isWatched, isFavorites} = film;
  const textDescription = checkLenghtText(description);
  const duration = getDuration(runtime);

  const isClassName = (className) => {
    if (className) {
      return `film-card__controls-item--active`;
    }

    return ``;
  };


  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year.getFullYear()}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${textDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isClassName(isWatchlist)}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isClassName(isWatched)}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isClassName(isFavorites)}">Mark as favorite</button>
      </form>
    </article>`
  );
};
