import {getUpperCaseLetter} from "../utils/common.js";
import AbstractView from "./abstract.js";
import {FilterType} from '../const.js';


const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  const titleName = getUpperCaseLetter(name);

  if (type === FilterType.ALL_MOVIES) {
    return `<a href="${name}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-filter-type="${type}" data-page="FILMS">${titleName}</a>`;
  } else {

    return (
      `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-filter-type="${type}" data-page="FILMS">${titleName} <span class="main-navigation__item-count">${count}</span></a>`

    );
  }
};

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
  .map((filter) => createFilterItemTemplate(filter, currentFilterType))
  .join(``);

  return (

    `<div class="main-navigation__items">

      ${filterItemsTemplate}
    </div>`

  );
};

export default class Filter extends AbstractView {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement()
      .querySelectorAll(`.main-navigation__item`)
      .forEach((element) => element.addEventListener(`click`, this._filterTypeChangeHandler));
  }

}
