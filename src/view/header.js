import AbstractView from "./abstract.js";
import {getUserRank} from "../utils/film.js";

const createHeaderProfileTemplate = (profileRating) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Header extends AbstractView {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
    this.setUserRating = this.setUserRating.bind(this);
    this._moviesModel.addObserver(this.setUserRating);
  }

  getTemplate() {
    return createHeaderProfileTemplate(getUserRank(this._moviesModel.getWatchedCount()));
  }

  setUserRating() {
    this.getElement().querySelector(`.profile__rating`).textContent = getUserRank(this._moviesModel.getWatchedCount());
  }
}

