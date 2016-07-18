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
  			$scope.data = DataModel.getData();
  }]);
