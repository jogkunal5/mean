angular.module('ProviderApp')
        .controller('HomeController', function ($http, $scope) {
            $http.get('/providerlist').success(function (response) {
                $scope.providerlist = response; // This will put data into our html file
                $scope.provider = "";
            });
        });