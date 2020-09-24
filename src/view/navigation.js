import AbstractView from "./abstract.js";
import {MenuItem} from '../const.js';


export const createNavigationTemplate = () => {


  return (
    `<nav class="main-navigation">

      <a href="#stats" class="main-navigation__additional" data-page="STATS">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractView {
  constructor() {
    super();

    this._menuTypeChangeHandler = this._menuTypeChangeHandler.bind(this);

  }

  getTemplate() {
    return createNavigationTemplate();
  }

  _menuTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.page);
  }

  setMenuTypeChangeHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuTypeChangeHandler);
  }

  setActiveMenuItem(menuItem) {

    if (menuItem === MenuItem.STATS) {
      this.getElement().querySelector(`[data-page="STATS"]`).classList.add(`main-navigation__item--active`);
    }

  }
}
