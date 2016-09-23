import angular from 'angular';
import appModule from '../app.module';

import * as d3 from "d3";
// Define d3 globally, otherwise d3pie won't work
window.d3 = d3;
import d3pie from 'd3pie';

class PieDirective {
    constructor() {
        this.restrict = 'E';
        this.template = '<div class="pie"></div>';
        this.scope = {
            data: '='
        };
    }

    link(scope, element) {
        scope.$watch('data', (data) => {
            if (data) {
                new d3pie(element[0], {
                    "size": {
                        "canvasWidth": 590,
                        "pieOuterRadius": "90%"
                    },
                    "data": {
                        "sortOrder": "value-desc",
                        "content": Object.keys(scope.data).map((year) => {
                            return {
                                label: year,
                                value: data[year]
                            };
                        })
                    },
                    "labels": {
                        "outer": {
                            "pieDistance": 32
                        },
                        "inner": {
                            "hideWhenLessThanPercentage": 3
                        },
                        "mainLabel": {
                            "fontSize": 11
                        },
                        "percentage": {
                            "color": "#ffffff",
                            "decimalPlaces": 0
                        },
                        "value": {
                            "color": "#adadad",
                            "fontSize": 11
                        },
                        "lines": {
                            "enabled": true
                        },
                        "truncation": {
                            "enabled": true
                        }
                    },
                    "effects": {
                        "pullOutSegmentOnClick": {
                            "effect": "linear",
                            "speed": 400,
                            "size": 8
                        }
                    },
                    "misc": {
                        "gradient": {
                            "enabled": true,
                            "percentage": 100
                        }
                    }
                });
            }
        });
    }
};

export default angular.module(appModule.name)
    .directive('pieDirective', () => new PieDirective());
