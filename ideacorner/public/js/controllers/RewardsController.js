angular.module('IdeaCorner')
        .controller('RewardsController', function ($http, $scope) {

            $http.get('/get_users').success(function (response) {
                $scope.users = response; // This will put data into our html file                                
            });

            $http.get('/get_theme_names').success(function (response) {
                $scope.theme_names = response; // This will put data into our html file                                
            });



            $scope.getByData = function () {

                var parameters = {};

                if ($scope.by_ratings !== '') {
                    parameters.rate = $scope.by_ratings;
                }

                if ($scope.by_theme !== "") {
                    parameters.theme_name = $scope.by_theme;
                }

                if ($scope.by_reviewer !== "") {
                    parameters.reviewed_by = $scope.by_reviewer;
                }

                if ($scope.by_status !== "") {
                    parameters.status = $scope.by_status;
                }

                $http.get('/get_by_data/', {params: parameters}).success(function (response) {
                    $scope.query=parameters;
                    $scope.list = response; // This will put data into our html file
                });
            };
            
            $scope.getByData();

        });