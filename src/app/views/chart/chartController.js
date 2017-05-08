/**
 * chartController.js
 *
 * The AngularJS controller for the chart view
 */

angular.module('app.chart')
    .controller('chartController', function($scope, $http, $state, Data) {

        var playerData = Data.query();

        playerData.$promise
            .then(function(data) {

              /**
               * Get player data from API
               */
              $scope.playerData = data.data;

              /**
               * Initialize scope properties
               */
              $scope.data = [];
              $scope.serverData = [];
              $scope.players = [];
              $scope.width = 1200;
              $scope.height = 400;
              $scope.max = 0;

              /**
               * Store all the dates from the get call in $scope.dates
               */
              $scope.dates = $scope.playerData.DAILY.dates;

              /**
               * @function parseDates [ This function is called to parse the
               *           dates stored in $scope.dates to a valid UTC format]
               */
              $scope.parseDates = function () {
                  for (var i=0; i<$scope.dates.length; i++) {
                      var tempYear = '';
                      var tempMonth = '';
                      var tempDay = '';
                      if ($scope.dates[i]!==null) {
                          for (var j = 0; j < $scope.dates[i].length; j++) {
                              if (j < 4) {
                                  tempYear += $scope.dates[i][j];
                              } else if (j < 6) {
                                  tempMonth += $scope.dates[i][j];
                              } else {
                                  tempDay += $scope.dates[i][j];
                              }
                          }
                          $scope.dates[i] = Date.parse(tempMonth + ' ' + tempDay + ' ' + tempYear);
                      }
                  }
              };

              /**
               * @function populatePlayers [ This function is called to populate the
               *           $scope.players array from all the players received from the get call]
               */
              $scope.populatePlayers = function () {
                  var keyNames = Object.keys($scope.playerData.DAILY.dataByMember.players);
                  for (var i=0; i < keyNames.length; i++) {
                      for (var key in $scope.playerData.DAILY.dataByMember.players) {
                          if (key === keyNames[i]) {
                              var value = $scope.playerData.DAILY.dataByMember.players[key];
                              var player = {
                                  name: keyNames[i],
                                  dates: $scope.dates,
                                  points: value.points
                              };
                              $scope.players.push(player);
                          }
                      }
                  }
              };

              /**
               * @function generateData [ This function is called to generate the
               *           data to be displayed in the bar chart ]
               */
              $scope.generateData = function () {
                  for (var i = 0; i < $scope.currentPlayer.dates.length; i++) {
                      var id = $scope.currentPlayer.name + $scope.currentPlayer.dates[i];
                      var playerPoints = {
                          id: id,
                          name: $scope.currentPlayer.name,
                          date: $scope.currentPlayer.dates[i],
                          points: $scope.currentPlayer.points[i]
                      };
                      $scope.data.push(playerPoints);
                  }
              };

              /**
               * @function sortPlayerData [ This function is called to
               *           sort the player data]
               */
              $scope.sortPlayerData = function () {
                  for (var i=0; i<$scope.players.length; i++) {
                      for (var j=0; j<$scope.players[i].dates.length; j++) {
                          var id = $scope.players[i].name + $scope.players[i].dates[j];
                          var playerPoints = {
                              id: id,
                              name: $scope.players[i].name,
                              date: $scope.players[i].dates[j],
                              points: $scope.players[i].points[j]
                          };
                          if ($scope.players[i].dates[j]!==null) {
                              $scope.serverData.push(playerPoints);
                          }
                      }
                  }
              };

              /**
               * @function setCurrentPlayer [ This function is called to store
               *           the current player selected in $scope.currentPlayer ]
               * @param {Object} _player [The current player]
               */
              $scope.setCurrentPlayer = function (_player) {
                  $scope.data = [];
                  $scope.currentPlayer = _player;
                  $scope.generateData();
                  document.querySelector('.chart').scrollLeft = 0;
              };

              /**
               * @function showDetails [ This function is called to redirect the user
               *           to the details view with the id of the selected bar data ]
               * @param {int} _barId [The id of the selected bar data]
               */
              $scope.showDetails = function (_barId) {

                  angular.forEach($scope.serverData, function (_player) {
                      if (_player.id === _barId) {
                        console.log(_player);
                        $state.go('details', {
                            id: _player.id,
                            player: _player
                        });
                      }
                  });
              };

              /**
               * @function constructBarChart [ This function is called to construct
               *           the bar chart according to the data in $scope.data ]
               */
              $scope.constructBarChart = function () {
                  for (var i = 0; i < $scope.data.length; i++) {
                      if ($scope.data[i].points > $scope.max)
                          $scope.max = $scope.data[i].points;
                  }
              };

              /**
               * Initialize functions
               */
              $scope.parseDates();
              $scope.populatePlayers();
              $scope.currentPlayer = $scope.players[0];
              $scope.generateData();
              $scope.sortPlayerData();
              $scope.constructBarChart();

            }, function (error) {
              console.log(error);
            });
    });
