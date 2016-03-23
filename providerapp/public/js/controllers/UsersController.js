IdeaCorner.controller('UsersController', ['$scope', '$http', 'multipartForm', '$routeParams', function ($scope, $http, multipartForm, $routeParams) {
        console.log("Hello World from controller");

        $scope.contact = {};

        var refresh = function (id) {
            $http.get('/contactlist').success(function (response) {
                console.log("I got the data that I requested");
                $scope.contactlist = response; // This will put data into our html file
                $scope.contact = "";
            });
        };


        $scope.addContact = function () {            
            multipartForm.post('/contactlist', $scope.contact);
        };

        if ($routeParams.id !== undefined) {
            $http.get('/contactlist/' + $routeParams.id).success(function (response) {
                $scope.contact = response;
            });
        }

        $scope.update = function () {
            console.log($scope.contact._id);
            //$scope.contact means sending all form data to server
            $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function (response) {
                refresh();
            });
        };

        $scope.deselect = function () {
            $scope.contact = "";
        };

        $scope.$on('eventFired', function (event, data) {
            refresh();
        });

    }]);