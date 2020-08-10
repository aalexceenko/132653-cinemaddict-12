const getUserName = (count) => {
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

export const createHeaderProfileTemplate = (films) => {

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserName(films.length)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

