var IdeaCorner = angular.module('IdeaCorner', ['ngRoute', 'smart-table'])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider
                        .when('/home', {
                            templateUrl: 'templates/home/index.html',
                            controller: 'HomeController',
                            controllerAs: 'home'
                        })
                        .when('/themes', {
                            templateUrl: 'templates/themes/index.html',
                            controller: 'ThemesController',
                            controllerAs: 'themes'
                        })
                        .when('/manage', {
                            templateUrl: 'templates/manage/index.html',
                            controller: 'ManageController',
                            controllerAs: 'manage'
                        })
                        .when('/users', {
                            templateUrl: 'templates/users/index.html',
                            controller: 'UsersController',
                            controllerAs: 'contact'
                        })
                        .when('/users/:id', {
                            templateUrl: 'templates/users/index.html',
                            controller: 'UsersController',
                            controllerAs: 'contact'
                        })
                        .when('/rewards', {
                            templateUrl: 'templates/rewards/index.html',
                            controller: 'RewardsController'
                        })
                        .otherwise({redirectTo: '/home'});
            }]);
