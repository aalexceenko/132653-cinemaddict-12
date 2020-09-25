export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getUpperCaseLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};


export const addClassName = (classNames, state) => {
  if (state) {
    return classNames;
  }

  return ``;
};

export const generateId = () => `_` + Math.random().toString(36).substr(2, 9);

export const getUniqueArray = (arr) => {
  return [...new Set(arr)];
};


