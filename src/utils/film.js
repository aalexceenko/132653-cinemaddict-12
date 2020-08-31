const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;

export const getDuration = (time) => {
  const hours = Math.floor(time / MINUTES_IN_HOUR) > 0 ? `${Math.floor(time / MINUTES_IN_HOUR)}h` : ``;
  const minutes = time % MINUTES_IN_HOUR > 0 ? `${time % SECONDS_IN_MINUTE}m` : ``;
  return `${hours} ${minutes}`;
};

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
