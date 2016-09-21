import angular from 'angular';
import appModule from './app.module';

import topComponent from './top/top.component';
import chartComponent from './chart/chart.component';
import favouritesComponent from './favourites/favourites.component';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/app.css';

/*
import 'bootstrap';
*/

let appComponent = {
  template: require('./app.html'),
  $routeConfig: [
    {path: '/top', name: 'Top', component: 'topComponent', useAsDefault: true},
    {path: '/chart', name: 'Chart', component: 'chartComponent' },
    {path: '/favourites', name: 'Favourites', component: 'favouritesComponent' }
  ]
};

angular.module(appModule.name)
  .component('appComponent', appComponent);
