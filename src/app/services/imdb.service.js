import angular from 'angular';
import serviceModule from './services.module';
import storageService from './storage.service';

class IMDBService {
    constructor(storageService, $http, $q) {
        this.storageService = storageService;
        this.$http = $http;
        this.$q    = $q;
    }

    getTop20Movies() {
        return this.$http.get('data/imdb/top20.json').then((response) => {
            var movies = response.data.data.movies;
            return this.$q.all(movies.map((movie) => {
                return this.getTrailers(movie).then((trailers) => {
                    movie.trailers = trailers;
                    return movie;
                });
            }));
        }).then((movies) => {
            var favouritesIds = this.getFavouriteMoviesIds();
            movies.forEach((movie) => {
                movie.isFavourite = favouritesIds.indexOf(movie.idIMDB) > -1;
            });
            return movies
        });
    }

    getAllFavourites() {
        return this.getTop20Movies().then((movies) => {
            return movies.filter((movie) => movie.isFavourite);
        });
    }

    getCountPerDecade() {
        return this.getTop20Movies().then((movies) => {
            var countPerYear = {};
            movies.forEach((movie) => {
                var index = Math.floor(+movie.year / 10) * 10;
                if (!countPerYear[index]) {
                    countPerYear[index] = 0;
                }
                countPerYear[index]++;
            });
            return countPerYear;
        });
    }

    getTrailers(movie) {
        return this.$http.get('data/imdb/trailers/' + movie.idIMDB + '.json').then((response) => {
            return response.data.data ? response.data.data.trailer : [];
        });
    }

    getFavouriteMoviesIds() {
        return this.storageService.get('favourites') || [];
    }

    addFavourite(movie) {
        var favouritesIds = this.getFavouriteMoviesIds();
        favouritesIds.push(movie.idIMDB);
        this.storageService.set('favourites', favouritesIds);
        movie.isFavourite = true;
    }

    removeFavourite(movie) {
        var favouritesIds = this.getFavouriteMoviesIds();
        var index = favouritesIds.indexOf(movie.idIMDB);
        if (index > -1) {
            favouritesIds.splice(index, 1);
            this.storageService.set('favourites', favouritesIds);
            movie.isFavourite = false;
        }
    }
}

IMDBService.$inject = ['storageService', '$http', '$q'];

angular.module(serviceModule.name).service('imdbService', IMDBService);