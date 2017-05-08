/**
 * detailsController.js
 *
 * The AngularJS controller for the details view
 */

angular.module('app.details')
    .controller('detailsController', function($scope, $state, $stateParams, $window) {

        /**
         * Set current player
         */
        if ($stateParams.player !== null) {
            $scope.currentPlayer = JSON.parse(JSON.stringify($stateParams.player));
            $window.localStorage.setItem('player', JSON.stringify($scope.currentPlayer));
        } else {
            $scope.currentPlayer = JSON.parse($window.localStorage.getItem('player'));
            console.log($scope.currentPlayer);
        }

        // /**
        //  * Make a get request to the api with the id received from $stateParams
        //  * to get the details for that id and store it in $scope.currentPlayer
        //  */
        // $http.get('/details/player/' + $scope.currentId, {
        //         headers: { 'Content-Type': 'application/json' }
        //     })
        //     .then(function (res) {
        //         $scope.currentPlayer = res.data;
        //     });

        /**
         * @function chartView [ This function is called to redirect
         *           the user to the chart view using angular ui-router ]
         */
        $scope.chartView = function () {
            $state.go('chart');
            $window.localStorage.removeItem('player');
        };

    });
