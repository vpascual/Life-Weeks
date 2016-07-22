'use strict';

/**
 * @ngdoc function
 * @name lifeWeeksApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the lifeWeeksApp
 */
angular.module('lifeWeeksApp')
  .controller('MainCtrl', ['$scope', 'DataModel', function($scope, DataModel) {
			// when the DataModel has received and processed the data, it should be added to the scope
			DataModel.getData().then(function(response) {
				$scope.data = response;
			})
  }]);
