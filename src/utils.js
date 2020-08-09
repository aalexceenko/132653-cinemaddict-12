const MINUTES_IN_HOUR = 60;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return (lower + Math.random() * (upper - lower)).toFixed(1);
};


export const getRandomArrayItem = (arr) => {
  if (arr.length === 0) {
    return [` `];
  }

  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

export const getRandomArrayItems = function (info) {

  if (info.length === 0) {
    return [` `];
  }

  const restInformation = info.slice();
  const countInformation = getRandomInteger(1, restInformation.length);
  let newArray = [];
  for (let i = 0; i < countInformation; i++) {
    newArray.push(restInformation.splice(getRandomInteger(0, restInformation.length - 1), 1));
  }

  return newArray;
};

export const getDuration = (time) => {
  const hours = Math.floor(time / MINUTES_IN_HOUR) > 0 ? `${Math.floor(time / MINUTES_IN_HOUR)}h` : ``;
  const minutes = time % MINUTES_IN_HOUR > 0 ? `${time % MINUTES_IN_HOUR}m` : ``;
  return `${hours} ${minutes}`;
};

export const generateDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getUpperCaseLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const addClassName = (className) => {
  if (className) {
    return `film-card__controls-item--active`;
  }

  return ``;
};