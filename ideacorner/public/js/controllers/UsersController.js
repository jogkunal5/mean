IdeaCorner.controller('UsersController', ['$scope', '$http', 'multipartForm', '$routeParams', function ($scope, $http, multipartForm, $routeParams) {
        console.log("Hello World from controller");

        $scope.contact = {};
        $scope.team = "DT207291";

        var refresh = function () {
            $http.get('/ideacorner').success(function (response) {
                console.log("I got the data that I requested");
                $scope.contactlist = response; // This will put data into our html file
                $scope.contact = "";
            });
        };

        $scope.addIdea = function () {
            $scope.contact.team = $scope.team;
            $scope.contact.title = $scope.title;
            $scope.contact.description = $scope.description;
            $scope.contact.theme_name = $scope.currentThemeName;
            $scope.contact.theme_quarter = $scope.currentThemeQuarter;
            $scope.contact.from = $scope.from;
            $scope.contact.to = $scope.to;
            multipartForm.post('/ideacorner', $scope.contact);            
            alert("Idea posted successfully");
            $scope.contact = "";
        };

        if ($routeParams.id !== undefined) {
            $http.get('/ideacorner/' + $routeParams.id).success(function (response) {
                $scope.contact = response;
            });
        }

        $scope.update = function () {
            console.log($scope.contact._id);
            //$scope.contact means sending all form data to server
            $http.put('/ideacorner/' + $scope.contact._id, $scope.contact).success(function (response) {
                refresh();
            });
        };

        $scope.deselect = function () {
            $scope.contact = "";
        };

        $scope.$on('eventFired', function (event, data) {
            refresh();
        });

        $http.get('/themes').success(function (response) {
            if (response) {
                $scope.currentThemeName = response[0].theme_name;
                $scope.currentThemeQuarter = response[0].theme_quarter;
                $scope.from = response[0].from;
                $scope.to = response[0].to;
            }
        });

    }]);