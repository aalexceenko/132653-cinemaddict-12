import HeaderView from "./view/header.js";
import StatisticUserView from "./view/statistic.js";
import NavigationView from './view/navigation.js';
import StatisticsFilmView from "./view/stats.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import MovieListPresenter from "./presenter/movie-list.js";
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import Api from "./api.js";
import {UpdateType, MenuItem} from "./const.js";

const AUTHORIZATION = `Basic eo1w590ik29889e`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticaContainer = document.querySelector(`.footer__statistics`);

const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const navigationComponent = new NavigationView();
const filmContainerPresenter = new MovieListPresenter(siteMainElement, moviesModel, filterModel, api);
const filterPresenter = new FilterPresenter(filterModel, moviesModel, navigationComponent);

let statisticsComponent = new StatisticsFilmView(moviesModel.getFilms());

const handleMenuTypeChange = (menuItem) => {
  switch (menuItem) {
    case MenuItem.FILMS:
      if (!filmContainerPresenter.isInited()) {
        remove(statisticsComponent);
        filmContainerPresenter.destroy();
        filmContainerPresenter.init();
      }

      break;
    case MenuItem.STATS:
      filmContainerPresenter.destroy();
      remove(statisticsComponent);
      statisticsComponent = new StatisticsFilmView(moviesModel.getFilms());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

      break;
  }
};

navigationComponent.setMenuTypeChangeHandler(handleMenuTypeChange);

render(siteMainElement, navigationComponent, RenderPosition.AFTERBEGIN);

filterPresenter.init();
filmContainerPresenter.init();

api.getFilms()
  .then((films) => {
    moviesModel.setFilms(UpdateType.INIT, films);
    render(siteHeaderElement, new HeaderView(moviesModel), RenderPosition.BEFOREEND);
    render(footerStatisticaContainer, new StatisticUserView(films), RenderPosition.BEFOREEND);
  });

