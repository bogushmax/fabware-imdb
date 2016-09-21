import angular from 'angular';
import serviceModule from './services.module';

class StorageService {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

angular.module(serviceModule.name).service('storageService', StorageService);