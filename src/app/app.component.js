import angular from 'angular';
import appModule from './app.module';

import topComponent from './top/top.component';
import chartComponent from './chart/chart.component';
import favouritesComponent from './favourites/favourites.component';

import 'bootstrap/dist/css/bootstrap.css';
import './app.css';

/*
 import 'bootstrap';
 */

class AppController {
    constructor($rootRouter) {
        this.$rootRouter = $rootRouter;
    }

    isActive(routerLink) {
        var instruction = this.$rootRouter.generate(routerLink);
        return this.$rootRouter.isRouteActive(instruction);
    }
}

AppController.$inject = ['$rootRouter'];

let appComponent = {
    template: require('./app.html'),
    controller: AppController,
    $routeConfig: [
        {path: '/top', name: 'Top', component: 'topComponent', useAsDefault: true},
        {path: '/chart', name: 'Chart', component: 'chartComponent'},
        {path: '/favourites', name: 'Favourites', component: 'favouritesComponent'}
    ]
};

angular.module(appModule.name)
    .component('appComponent', appComponent);
