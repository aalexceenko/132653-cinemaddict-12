import moment from 'moment';

export const getDuration = (minutes) => {

  const duration = moment.duration(minutes, `minutes`);
  const format = minutes > 60 ? `H[h] mm[m]` : `mm[m]`;
  return moment.utc(duration.as(`milliseconds`)).format(format).toString();
};

export const getDayMonthYearFromDate = (date) => moment(date).format(`DD MMMM YYYY`);

export const getDateCommentFormat = (date) => moment(date).format(`YYYY/MM/DD HH:mm`);

export const getYearFromDate = (data) => moment(data).year();


export const generateDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};


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
  if (count === 0) {
    return ``;
  } else if (count >= 1 && count <= 10) {
    return `novice`;
  } else if (count >= 11 && count <= 20) {
    return `fan`;
  } else {
    return `movie buff`;
  }
};
