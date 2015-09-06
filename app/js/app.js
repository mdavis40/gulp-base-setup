var app = angular.module('AngularMaterial', [ 'ui.router', 'ngMaterial', 'ngMessages' ])

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('/', {
      url: '/',
      template: '<md-card><md-card-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</md-card-content></md-card>',
      controller: 'AppCtrl'
    })
    .state('/content', {
      url: '/content',
      templateUrl: 'html/content.html',
      controller: 'AppCtrl'
    })
}])
.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle()
  }

  $scope.firstname = 'Fred'
  $scope.lastname = 'Flintstone'
}])
