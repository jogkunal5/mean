angular.module('IdeaCorner')
        .controller('ThemesController', function ($http, $scope) {

            $scope.theme = {};

            var refresh = function () {
                $http.get('/themes').success(function (response) {
                    if (response) {
                        $scope.currentThemeName = response[0].theme_name;
                        $scope.currentThemeQuarter = response[0].theme_quarter;
                        $scope.from = response[0].from;
                        $scope.to = response[0].to;
                    }
                });
            };
            
            refresh();

            $scope.addTheme = function () {
                $http.post('/themes', {param: $scope.theme}).success(function (response) {
                    if (response) {
                        alert("Theme added successfully");
                        $scope.theme = "";
                        refresh();
                    }
                });
            };

        });