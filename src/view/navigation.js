import {getUpperCaseLetter} from "../utils/common.js";
import AbstractView from "./abstract.js";

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;

  const titleName = getUpperCaseLetter(name);

  return (
    `<a href="#${name}" class="main-navigation__item">${titleName} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const createNavigationTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
  .map((filter) => createFilterItemTemplate(filter))
  .join(``);


  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createNavigationTemplate(this._filters);
  }

}

