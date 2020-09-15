import {FilterType} from "../const";

export const filter = {
  // [FilterType.ALL_MOVIES]: (films) => films.filter((film) => film.isArchive),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isWatchlist).length,
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched).length,
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorites).length
};
