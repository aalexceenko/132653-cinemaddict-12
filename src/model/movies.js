import Observer from '../utils/observer.js';


export default class Movies extends Observer {
  constructor() {
    super();
    this._films = [];
  }
// ?
  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);

  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    return Object.assign({}, film, {

      title: film.film_info.title,
      origanalTitle: film.film_info.alternative_title,
      poster: film.film_info.poster,
      rating: film.film_info.total_rating,
      writer: film.film_info.writers,
      director: film.film_info.director,
      actors: film.film_info.actors,
      country: film.film_info.release.release_country,
      age: film.film_info.age_rating,
      year: film.film_info.release.date,
      runtime: film.film_info.runtime,
      genres: film.film_info.genre,
      description: film.film_info.description,
      comments: film.comments,
      isWatchlist: film.user_details.watchlist,
      isWatched: film.user_details.already_watched,
      isFavorites: film.user_details.favorite
      // watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date,


    });
  }

  static adaptToServer(film) {
    return Object.assign({}, film, {
      "film_info": {
        "poster": film.poster,
        "title": film.title,
        "alternative_title": film.origanalTitle,
        "total_rating": film.rating,
        "director": film.director,
        "writers": film.writer,
        "actors": film.actors,
        "release": {
          "date": film.year instanceof Date ? film.year.toISOString() : null,
          "release_country": film.country,
        },
        "runtime": film.runtime,
        "genre": film.genres,
        "description": film.description,
        "age_rating": film.age,
      },
      "user_details": {
        "already_watched": film.isWatched,
        "watchlist": film.isWatchlist,
        "favorite": film.isFavorites,
        // "watching_date": film.status.watchingDate instanceof Date ? film.status.watchingDate.toISOString() : null,
      }
    });
  }

}
