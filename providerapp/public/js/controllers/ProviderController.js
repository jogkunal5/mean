angular.module('ProviderApp')
        .controller('ProviderController', function ($http, $scope, $routeParams, $timeout, $window, flashService) {

            $http.get('/listcollections').success(function (response) {

                Array.prototype.removeValue = function (name, value) {
                    var array = $.map(this, function (v, i) {
                        return v[name] === value ? null : v;
                    });
                    this.length = 0; //clear original array
                    this.push.apply(this, array); //push all elements except the one we want to delete
                };

                response.removeValue('name', 'providerlist');

                $scope.collectionList = response;
            });


            $scope.getCollectionData = function () {
                $http.get('/getcollectiondata/', {
                    params: {
                        collection: $scope.collection
                    }
                }).success(function (response) {
                    //alert(JSON.stringify(response));
                    $scope.collectionName = $scope.collection;
                    $scope.providerList = response; // This will put data into our html file
                });
            };

            $scope.export = function (id) {
                $http({
                    url: '/exports/' + id,
                    method: "PUT",
                    data: {
                        providerList: $scope.providerModelData,
                        collectionName: $scope.colName
                    }, //this is your json data string
                    headers: {
                        'Content-type': 'application/json'
                    },
                    responseType: 'arraybuffer'
                }).success(function (data, status, headers, config) {
                    var blob = new Blob([data], {
                        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    });
                    var objectUrl = URL.createObjectURL(blob);
                    $window.open(objectUrl);
                }).error(function (data, status, headers, config) {
                    //upload failed
                });
            };

            $scope.save = function (id) {
                $http({
                    url: '/save/' + id,
                    method: "PUT",
                    data: {
                        providerList: $scope.providerModelData,
                        collectionName: $scope.colName
                    }, //this is your json data string
                    headers: {
                        'Content-type': 'application/json'
                    },
                    responseType: 'arraybuffer'
                }).success(function (response) {
                    if (response) {
                        $scope.showModal = false;
                        $scope.getCollectionData();
                        flashService.Success('Record updated successfully');
                    }

                }).error(function (error) {
                    flashService.Error(error);
                });
            };


            $scope.showModal = false;
            $scope.toggleModal = function (colId, colName) {

                $http.get('/collectiondata/' + colId + '/collectionName/' + colName).success(function (response) {
                    $scope.colName = colName;
                    $scope.colId = colId;
                    $scope.providerModelData = response;
                    $scope.showModal = !$scope.showModal;
                });
            };

        });