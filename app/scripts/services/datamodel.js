'use strict';

/**
 * @ngdoc service
 * @name lifeWeeksApp.DataModel
 * @description
 * # DataModel
 * Service in the lifeWeeksApp.
 */
angular.module('lifeWeeksApp')
  .service('DataModel', ['DataService', '$q', function (DataService, $q) {

    // count days between two dates
  	function daysBetweenDates(d1, d2) {
	    var diffDays, oneDay;
	    oneDay = 24 * 60 * 60 * 1000;
	    diffDays = (d2 - Date.parse(d1)) / oneDay;
	    return diffDays;
	};

	// this is to ease the data entering process
    // it converts years expressed in decimals to weeks
    var decimalYearToWeek = d3.scaleLinear()
    	.domain([0, 85])
    	.range([0, 85*52]);


    // this function uses the DataService to retrieve the JSON data and format it appropriately
    this.getData = function() {
        var deferred = $q.defer();

        // the DataService returns a promise
        DataService.getData().then(function(response) {
            var values = response.data;
            var data = [];   

            values[values.length - 1].end = daysBetweenDates('Oct 15, 1981 00:00:00', new Date()) / 365;

            values.forEach(function(d) {
                d.weekInit = Math.floor(decimalYearToWeek(d.init));
                d.weekEnd = Math.floor(decimalYearToWeek(d.end));
            });

            values.forEach(function(d) {
                for (var i = d.weekInit; i<d.weekEnd; i++)
                    data.push(d)
            });
            
            while (data.length < 85*52) {
                data.push({name: 'To be enjoyed!'})
            };  

            deferred.resolve(data);
        })

        return deferred.promise;
    }
  }]);
