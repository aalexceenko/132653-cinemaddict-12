import moment from 'moment';

const WatchCountFilms = {
  NONE: 0,
  NOVICE: 1,
  FAN: 11,
  MOVIE_BUFF: 20,
};

export const getDuration = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const format = minutes > 60 ? `H[h] mm[m]` : `mm[m]`;
  return moment.utc(duration.as(`milliseconds`)).format(format).toString();
};

export const getDayMonthYearFromDate = (date) => moment(date).format(`DD MMMM YYYY`);

export const getDateCommentFormat = (date) => moment(date).format(`YYYY/MM/DD HH:mm`);

export const getYearFromDate = (date) => moment(date).year();

export const sortFilmDown = (filmA, filmB) => {
  return filmB.year.getFullYear() - filmA.year.getFullYear();
};

export const sortFilmRating = (filmA, filmB) => {
  if (filmA.rating > filmB.rating) {
    return -1;
  }

  if (filmA.rating < filmB.rating) {
    return 1;
  }

  return 0;
};

export const countFilmsDuration = (counter, film) => {
  return counter + film.runtime;
};

export const getUserRank = (count) => {
  if (count === WatchCountFilms.NONE) {
    return ``;
  } else if (count >= WatchCountFilms.NOVICE && count < WatchCountFilms.FAN) {
    return `novice`;
  } else if (count >= WatchCountFilms.FAN && count < WatchCountFilms.MOVIE_BUFF) {
    return `fan`;
  } else {
    return `movie buff`;
  }
};
