export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandom = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  return (lower + Math.random() * (upper - lower)).toFixed(1);
};

export const generatePosition = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);

  return arr[randomIndex];
};

export const getRandomInformation = function (info) {
  const restInformation = info.slice();
  const countInformation = getRandomInteger(1, restInformation.length);
  let newArray = [];
  for (let i = 0; i < countInformation; i++) {
    newArray.push(restInformation.splice(getRandomInteger(0, restInformation.length - 1), 1));
  }

  return newArray;
};

export const getDuration = (time) => {
  const hours = Math.floor(time / 60) > 0 ? `${Math.floor(time / 60)}h` : ``;
  const minutes = time % 60 > 0 ? `${time % 60}m` : ``;
  return `${hours}   ${minutes}`;
};

