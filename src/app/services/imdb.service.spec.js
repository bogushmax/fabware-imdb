import serviceModule from './services.module';
import imdbService from './imdb.service';

describe('IMDB Service', () => {
    var imdbService, $httpBackend;

    beforeEach(() => {
        angular.mock.module(serviceModule.name);

        angular.mock.inject((_imdbService_, _$httpBackend_) => {
            imdbService = _imdbService_;
            $httpBackend = _$httpBackend_;
        });

        $httpBackend.whenGET(/data\/imdb\/trailers\/(.)*.json/).respond({
            data: {
                trailer: []
            }
        });

        localStorage.clear()
    });

    it('should count statistic per decade', () => {
        $httpBackend.whenGET('data/imdb/top20.json').respond({
            data: {
                movies: [
                    {
                        year: '1995'
                    },
                    {
                        year: '1993'
                    },
                    {
                        year: '1995'
                    },
                    {
                        year: '1996'
                    },
                    {
                        year: '1998'
                    },
                    {
                        year: '1995'
                    },
                    {
                        year: '2015'
                    }
                ]
            }
        });
        imdbService.getCountPerDecade().then((statistics) => {
            expect(statistics['1990']).toEqual(6);
            expect(statistics['2010']).toEqual(1);
        });
        $httpBackend.flush();
    });

    it('should add favourite movies', () => {
        $httpBackend.whenGET('data/imdb/top20.json').respond({
            data: {
                movies: [
                    {
                        idIMDB: '1'
                    },
                    {
                        idIMDB: '2'
                    }
                ]
            }
        });
        imdbService.getAllFavourites().then((movies) => {
            expect(movies.length).toEqual(0);
            imdbService.addFavourite({idIMDB: '1'});
            imdbService.getAllFavourites().then((movies) => {
                expect(movies.length).toEqual(1);
            });
        });
        $httpBackend.flush();
    });
});