angular
  .module('app.chart')
  .factory('Data', Data);

function Data($resource, API) {
  return $resource(API.url, {}, {
    query: {
      method: 'GET'
    }
  });
}
