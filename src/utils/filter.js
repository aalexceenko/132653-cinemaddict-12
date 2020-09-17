import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL_MOVIES]: (films) => films.slice(),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.isWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorites)
};
