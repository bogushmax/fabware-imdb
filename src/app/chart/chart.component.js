import angular from 'angular';
import appModule from '../app.module';

import imdbService from '../services/imdb.service';
import './pie.directive';

class ChartController {
    constructor(imdbService) {
        imdbService.getCountPerDecade().then((countPerDecade) => {
            this.countPerDecade = countPerDecade;
        });
    }
}

ChartController.$inject = ['imdbService'];

let chartComponent = {
    template: require('./chart.html'),
    controller: ChartController
};

export default angular.module(appModule.name)
    .component('chartComponent', chartComponent);
