import SmartView from './smart.js';
import {filter} from "../utils/filter.js";
import {FilterType, StatisticFilterType} from "../const.js";
import {countFilmsDuration, getUserRank} from "../utils/film.js";
import {getFilmsStatistics, getTopGenre, getListWatchedFilmsInDateRange} from "../utils/stats.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";

const STATISTICS_FILTERS = [
  {
    title: `All time`,
    value: `all-time`,
  },
  {
    title: `Today`,
    value: `today`,
  },
  {
    title: `Week`,
    value: `week`,
  },
  {
    title: `Month`,
    value: `month`,
  },
  {
    title: `Year`,
    value: `year`,
  }
];

const BAR_HEIGHT = 50;

const renderStatisticsChart = (statisticCtx, films) => {

  const {genres, filmsByGenre} = getFilmsStatistics(films);

  statisticCtx.height = BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genres,
      datasets: [{
        data: filmsByGenre,
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createStatisticsFilters = (currentFilter) => {
  return STATISTICS_FILTERS.map(({value, title} = {}) => {
    return (
      `<input type="radio"
        class="statistic__filters-input visually-hidden"
        name="statistic-filter"
        id="statistic-${value}"
        value="${value}"
        ${value === currentFilter ? `checked` : ``}>
      <label for="statistic-${value}" class="statistic__filters-label">${title}</label>`
    );
  }).join(``);
};

const createStatisticAllFilmsTemplate = (statisticsData) => {
  const {films, statisticFilter} = statisticsData;
  const watchedFilms = filter[FilterType.HISTORY](films);
  const watchedFilmsCount = watchedFilms.length;
  const totalDurationCount = watchedFilms.reduce(countFilmsDuration, 0);
  const filmsTotalDuration = moment.duration(totalDurationCount, `m`);
  const filmsTotalDurationHours = Math.floor(filmsTotalDuration.asHours());
  const statisticsFiltersTemplate = createStatisticsFilters(statisticFilter);
  const {filmsByGenre, genres} = getFilmsStatistics(films);
  const {genre: topGenre} = getTopGenre(filmsByGenre, genres);
  const userRank = getUserRank(watchedFilmsCount);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        ${statisticsFiltersTemplate}

      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedFilmsCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${filmsTotalDurationHours} <span class="statistic__item-description">h</span> ${filmsTotalDuration.minutes()} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class StatisticsFilm extends SmartView {
  constructor(films, statisticFilter = StatisticFilterType.ALL_TIME) {
    super();

    this._films = films;

    this._data = {
      films,
      statisticFilter
    };

    this._periodChangeHandler = this._periodChangeHandler.bind(this);

    this._setCharts();
    this._setStatisticsHandler();
  }

  getTemplate() {
    return createStatisticAllFilmsTemplate(this._data);
  }

  restoreHandlers() {
    this._setStatisticsHandler();
    this._setCharts();
  }

  _setStatisticsHandler() {
    this.getElement().addEventListener(`change`, this._periodChangeHandler);
  }

  _setCharts() {
    if (this._filmsChart !== null) {
      this._filmsChart = null;
    }

    const {films, dateFrom, dateTo} = this._data;
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    this._filmsChart = renderStatisticsChart(statisticCtx, films, dateFrom, dateTo);
  }

  _periodChangeHandler(evt) {
    evt.preventDefault();
    let films = [];

    switch (evt.target.value) {
      case StatisticFilterType.ALL_TIME:
        films = this._films;
        break;
      case StatisticFilterType.TODAY:
        films = getListWatchedFilmsInDateRange(this._films, new Date(), new Date());
        break;
      case StatisticFilterType.WEEK:
        films = getListWatchedFilmsInDateRange(
            this._films,
            (() => {
              const daysToFullWeek = 6;
              const date = new Date();
              date.setDate(date.getDate() - daysToFullWeek);
              return date;
            })(),
            new Date()
        );
        break;
      case StatisticFilterType.MONTH:
        films = getListWatchedFilmsInDateRange(
            this._films,
            (() => {
              const countMonthAgo = 1;
              const date = new Date();
              date.setMonth(date.getMonth() - countMonthAgo);
              return date;
            })(),
            new Date()
        );
        break;
      case StatisticFilterType.YEAR:
        films = getListWatchedFilmsInDateRange(
            this._films,
            (() => {
              const countYearAgo = 1;
              const date = new Date();
              date.setFullYear(date.getFullYear() - countYearAgo);
              return date;
            })(),
            new Date()
        );
        break;
    }
    this.updateData({
      films,
      statisticFilter: evt.target.value,
    });
  }
}

