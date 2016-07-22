'use strict';

/**
 * @ngdoc service
 * @name lifeWeeksApp.DataService
 * @description
 * # DataService
 * Service in the lifeWeeksApp.
 */
angular.module('lifeWeeksApp')
  .service('DataService', ['$http', function ($http) {
    return {
    	getData: function() {
    		return $http.get('./data/mylife.json');
    	}
    }
  }]);
