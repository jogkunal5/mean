ProviderApp.controller('ImportController', ['$scope', '$http', 'multipartForm', '$routeParams', function ($scope, $http, multipartForm, $routeParams) {

        $scope.provider = {};

        var refresh = function (id) {
            $http.get('/providerlist').success(function (response) {
                $scope.providerlist = response; // This will put data into our html file
                $scope.provider = "";                
            });
        };


        $scope.addContact = function () {
            multipartForm.post('/providerlist', $scope.provider);
            var message = "<strong>List Created!</strong> The list <em>" + $scope.lastAdded.content + "</em> has been created. <a ng-click='undoAdd();' href=''>Undo</a>";
            Flash.create('danger', message, 0, 'customAlert');
        };

        if ($routeParams.id !== undefined) {
            $http.get('/providerlist/' + $routeParams.id).success(function (response) {
                $scope.provider = response;
            });
        }

        $scope.update = function () {
            console.log($scope.provider._id);
            //$scope.provider means sending all form data to server
            $http.put('/providerlist/' + $scope.provider._id, $scope.provider).success(function (response) {
                refresh();
            });
        };

        $scope.deselect = function () {
            $scope.provider = "";
        };

        $scope.$on('eventFired', function (event, data) {
            refresh();
        });

    }]);