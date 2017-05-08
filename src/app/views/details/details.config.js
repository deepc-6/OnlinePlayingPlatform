angular.module('app.details')
  .config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true).hashPrefix('!');

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state("details", {
        url: "/details/:id",
        templateUrl: 'app/views/details/details.tmpl.html',
        controller: 'detailsController',
        params: {
          id: null,
          player: null
        }
      });

  });
