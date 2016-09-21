import angular from 'angular';
import appModule from '../app.module';

import imdbService from '../services/imdb.service';
import moviesComponent from '../common/movies/movies.component';

class TopController {
    constructor(imdbService) {
        imdbService.getTop20Movies().then((movies) => {
            this.movies = movies;
        });
    }
}

TopController.$inject = ['imdbService'];

let topComponent = {
    template: require('./top.html'),
    controller: TopController
};

export default angular.module(appModule.name)
    .component('topComponent', topComponent);
