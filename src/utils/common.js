export const getUpperCaseLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};

export const addClassName = (classNames, state) => {
  if (state) {
    return classNames;
  }

  return ``;
};

export const generateId = () => `_` + Math.random().toString(36).substr(2, 9);

export const getUniqueArray = (array) => {
  return [...new Set(array)];
};


