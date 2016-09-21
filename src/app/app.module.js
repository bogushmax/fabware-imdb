import angular from 'angular';
import 'ngComponentRouter';
import modal from 'angular-ui-bootstrap/src/modal';

import serviceModule from './services/services.module';

let appModule = angular.module('app', [serviceModule.name, 'ngComponentRouter', modal]);

appModule.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
});

appModule.value('$routerRootComponent', 'appComponent');

export default appModule;