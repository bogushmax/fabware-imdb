import angular from 'angular';
import appModule from '../../app.module';

import imdbService from '../../services/imdb.service';

import trailerComponent from './trailers/trailer.modal';

class MoviesController {
    constructor(imdbService, $uibModal) {
        this.imdbService = imdbService;
        this.$uibModal = $uibModal;
    }

    openTrailer(trailer) {
        this.$uibModal.open({
            component: 'trailerComponent',
            resolve: {
                trailer: trailer
            }
        });
    }

    toggleFavourite(movie) {
        if (movie.isFavourite) {
            this.imdbService.removeFavourite(movie);
        } else {
            this.imdbService.addFavourite(movie);
        }
        this.onFavouriteChanged({movie: movie});
    }
}

MoviesController.$inject = ['imdbService', '$uibModal'];

let moviesComponent = {
    template: require('./movies.html'),
    controller: MoviesController,
    bindings: {
        movies: '=',
        onFavouriteChanged: '&'
    }
};

export default angular.module(appModule.name)
    .component('moviesComponent', moviesComponent);
