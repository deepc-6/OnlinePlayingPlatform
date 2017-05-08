angular.module('app.chart')
  .config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state("chart", {
        url: "/",
        templateUrl: 'app/views/chart/chart.tmpl.html',
        controller: 'chartController'
      });

  });
