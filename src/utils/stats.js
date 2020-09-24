import moment from "moment";

import {getUniqueArray} from "../utils/common.js";

export const countFilmsByGenre = (films, genre) => {
  return films.filter((film) => new Set(film.genres).has(genre)).length;
};

export const getFilmsStatistics = (films) => {
  const filmGenres = films
    .filter((film) => film.genres[0] !== undefined)
    .map((film) => film.genres[0]);
  const uniqueGenres = getUniqueArray(filmGenres);
  const filmsByGenre = uniqueGenres.map((genre) => countFilmsByGenre(films, genre));

  return {
    genres: uniqueGenres,
    filmsByGenre,
  };
};

const sortByGenre = (genreCountA, genreCountB) => {
  return genreCountB[1] - genreCountA[1];
};

export const getTopGenre = (filmsByGenre, genres) => {
  const genresMap = {};
  genres.forEach((genre, index) => {
    genresMap[genre] = filmsByGenre[index];
  });

  const sorted = Object.entries(genresMap)
    .sort(sortByGenre);

  const topGenre = {
    genre: ``,
    count: 0,
  };

  if (sorted.length) {
    topGenre.genre = sorted[0][0];
    topGenre.count = sorted[0][1];
  }

  return topGenre;
};

export const getListWatchedFilmsInDateRange = (films, dateFrom, dateTo) => {
  return films.filter((film) => {
    if (
      moment(film.watchingDate).isSame(dateFrom) ||
      moment(film.watchingDate).isBetween(dateFrom, dateTo) ||
      moment(film.watchingDate).isSame(dateTo)
    ) {
      return film;
    }
    return false;
  });
};
