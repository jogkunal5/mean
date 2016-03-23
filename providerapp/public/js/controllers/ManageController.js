angular.module('ProviderApp')
        .controller('ManageController', function ($http, $scope, $rootScope, flashService) {

            var list = function () {
                $http.get('/providerlist').success(function (response) {
                    console.log("I got the data that I requested");
                    $scope.providerlist = response; // This will put data into our html file
                    $scope.provider = "";                    
                });
            };

            list();

            $scope.remove = function (id) {
                console.log(id);
                $http.delete('/providerlist/' + id).success(function (response) {
                    list();
                    flashService.Success('Record deleted successfully');
                });
            };

            $scope.edit = function (id) {
                $rootScope.$broadcast('refresh', id);
//                $http.get('/providerlist/' + id).success(function (response) {
//                    $scope.provider = response;
//                });
            };

        });