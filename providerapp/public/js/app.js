var ProviderApp = angular.module('ProviderApp', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: 'templates/home/index.html',
        controller: 'HomeController',
        controllerAs: 'home'
    })
    .when('/themes', {
        templateUrl: 'templates/themes/index.html',
        controller: 'HomeController',
        controllerAs: 'home'
    })
    .when('/manage', {
        templateUrl: 'templates/manage/index.html',
        controller: 'ManageController',
        controllerAs: 'manage'
    })
    .when('/import', {
        templateUrl: 'templates/import/index.html',
        controller: 'ImportController',
        controllerAs: 'provider'
    })
    .when('/import/:id', {                            
        templateUrl: 'templates/import/index.html',
        controller: 'ImportController',
        controllerAs: 'provider'
    })                        
    .when('/provider', {                            
        templateUrl: 'templates/provider/index.html',
        controller: 'ProviderController',
        controllerAs: 'provider'
    })                        
    .when('/collectiondata/:id/collectionName/:collectionName', {                            
        templateUrl: 'templates/provider/form.html',
        controller: 'ProviderController',
        controllerAs: 'provider'
    })                        
    .otherwise({
        redirectTo: '/home'
    });
}]);
