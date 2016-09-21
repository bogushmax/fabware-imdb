import angular from 'angular';
import appModule from '../app.module';

import imdb from '../services/imdb.service';

class FavouritesController {
    constructor(imdbService) {
        this.imdbService = imdbService;
        imdbService.getAllFavourites().then((movies) => {
            this.movies = movies;
        });
    }

    onFavouriteChanged(movie) {
        this.movies.splice(this.movies.indexOf(movie), 1);
    }
}

FavouritesController.$inject = ['imdbService'];

let favouritesComponent = {
    template: require('./favourites.html'),
    controller: FavouritesController
};

export default angular.module(appModule.name)
    .component('favouritesComponent', favouritesComponent);
