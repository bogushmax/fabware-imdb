import angular from 'angular';
import appModule from '../../../app.module';

class TrailerController {
    constructor($sce) {
        this.$sce = $sce;
    }

    $onInit() {
        this.trustedTrailerEmbed = this.$sce.trustAsHtml(this.resolve.trailer.embed);
    }
}

TrailerController.$inject = ['$sce'];

let trailerComponent = {
    template: require('./trailer.html'),
    controller: TrailerController,
    bindings: {
        resolve: '<'
    }
};

export default angular.module(appModule.name)
    .component('trailerComponent', trailerComponent);
