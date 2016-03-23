angular.module('IdeaCorner')
        .controller('HomeController', function ($http, $scope) {
            $http.get('/ideacorner').success(function (response) {
                console.log("I got the data that I requested");
                $scope.rowCollection = response; // This will put data into our html file
                $scope.contact = "";
            });
        });