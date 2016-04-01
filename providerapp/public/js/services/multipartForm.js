ProviderApp.service('multipartForm', ['$http', '$rootScope', 'flashService', function ($http, $rootScope, flashService) {
        this.post = function (uploadUrl, data) {
            var fd = new FormData();

            for (var key in data) {
                fd.append(key, data[key]);
            }

            $http.post(uploadUrl, fd, {
                transformRequest: angular.indentity,
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                //Calling refresh event of controller here (service) to clear form fields
                flashService.Success('File imported successfully');
                $rootScope.$broadcast('eventFired', {
                    data: response
                });
            });

        };
    }]);