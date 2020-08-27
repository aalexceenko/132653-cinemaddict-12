import AbstractView from "./abstract.js";

const getUserRank = (count) => {
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

const createHeaderProfileTemplate = (films) => {

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${getUserRank(films.length)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Header extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createHeaderProfileTemplate(this._films);
  }

}

