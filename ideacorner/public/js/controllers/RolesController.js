angular.module('IdeaCorner').controller('RolesController', function ($http, $scope) {

    $scope.validateUser = function () {
        $http.get('/validate_user').success(function (response) {
            if (response) {
                return $scope.user = response;
            } else {
                return null;
            }
        });
    };

});