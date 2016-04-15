angular.module('IdeaCorner')
        .controller('ThemesController', function ($http, $scope, $routeParams) {

            $scope.id = "";

            var refresh = function () {
                $http.get('/themes').success(function (response) {
                    $scope.rowThemes = response; // This will put data into our html file
                    $scope.currentThemeName = response[0].theme_name;
                    $scope.currentThemeQuarter = response[0].theme_quarter;
                    $scope.from = response[0].from;
                    $scope.to = response[0].to;
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

            $scope.updateTheme = function (id) {
                $http({
                    url: '/themes/' + id,
                    method: "PUT",
                    data: {
                        themesData: $scope.theme
                    }
                }).success(function (response) {
                    if (response) {
                        alert("Theme updated successfully");
                    }
                });
            };

            if ($routeParams.id) {
                $http.get('/themes/' + $routeParams.id).success(function (response) {
                    $scope.id = $routeParams.id;
                    $scope.theme = response;
                });
            }

            $scope.check = function (id) {
                if (id)
                    $scope.updateTheme(id);
                else
                    $scope.addTheme();
            };

        });