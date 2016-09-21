var http = require('http');
var fs = require('fs');
var querystring = require("querystring");
var async = require('async');


fs.readFile('../top20.json', 'utf8', function (err, data) {
    var movies = JSON.parse(data).data.movies;
    async.waterfall(movies.map(function (movie) {
        return function (cb) {
            var idIMDB = movie.idIMDB;
            console.log('/trailerAddict/taapi?token=c76be4b7-8032-4121-a034-885e7b11c751&format=json&count=3&idIMDB=' + idIMDB + '&film=' + encodeURIComponent(movie.title));
            setTimeout(function () {
                http.get({
                    host: 'www.myapifilms.com',
                    path: '/trailerAddict/taapi?token=c76be4b7-8032-4121-a034-885e7b11c751&format=json&count=3&idIMDB=' + idIMDB + '&film=' + encodeURIComponent(movie.title)
                }, function (response) {
                    // Continuously update stream with data
                    var data = '';
                    response.on('data', function (d) {
                        data += d;
                    });
                    response.on('end', function () {
                        fs.writeFile("./" + idIMDB + ".json", data, function (err) {
                        cb();
                        });
                    });
                });
            }, 10 * 1000);
        }
    }));
});

