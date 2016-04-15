angular.module('IdeaCorner')
        .controller('ManageController', function ($http, $scope, $rootScope, $window) {

            $scope.showModal = false;

            var list = function () {
                $http.get('/ideacorner').success(function (response) {                    
                        $scope.rowCollection = response; // This will put data into our html file                                                                
                });
            };

            list();

            $scope.remove = function (id) {
                console.log(id);
                $http.delete('/ideacorner/' + id).success(function (response) {
                    list();
                });
            };

            $scope.toggleModal = function (id) {
                $http.get('/ideacorner/' + id).success(function (response) {
                    $scope.ideacorner = response;
                    if ($scope.ideacorner.rate)
                        $scope.ideacorner.rate = $scope.ideacorner.rate.toString();
                    $scope.showModal = !$scope.showModal;
                });
            };


            $scope.download = function (id) {
                $http.get('/download/' + id, {responseType: 'arraybuffer'}).success(function (data, status, headers, config) {

                    var blob = new Blob([data], {
                        type: "application/pdf"
                    });

                    var objectUrl = URL.createObjectURL(blob);
                    $window.open(objectUrl);

                }).error(function (data, status, headers, config) {
                    //upload failed
                });
            };


            $scope.save = function (id) {
                $http({
                    url: '/ideacorner/' + id,
                    method: "PUT",
                    data: {
                        ideacorner: $scope.ideacorner
                    }, //this is your json data string
                    headers: {
                        'Content-type': 'application/json'
                    },
                    responseType: 'arraybuffer'
                }).success(function (response) {
                    if (response) {
                        $scope.showModal = false;
                        list();
                    }

                }).error(function (error) {
                });
            };

        });