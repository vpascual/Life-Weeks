'use strict';

/**
 * @ngdoc service
 * @name lifeWeeksApp.DataModel
 * @description
 * # DataModel
 * Service in the lifeWeeksApp.
 */
angular.module('lifeWeeksApp')
  .service('DataModel', [function () {
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
    	.rangeRound([0, 85*52]);

  	var values = [
    		{
    			name: "Early years",
    			init: 0,
    			end: 4
    		},
    		{
    			name: "Elementary school",
    			init: 4,
    			end: 6
    		},
    		{
    			name: "Middle school",
    			init: 6,
    			end: 14
    		},
    		{
    			name: "High school",
    			init: 14,
    			end: 17.9
    		},
    		{
    			name: "Computer Engineering @ UPF",
    			init: 17.9,
    			end: 22.8,
    			url: "https://www.upf.edu"
    		},
    		{
    			name: "Internship at UPF",
    			init: 22.8,
    			end: 23.6,
    			url: "https://www.upf.edu"
    		},
    		{
    			name: "PhD",
    			init: 23.6,
    			end: 28.75,
    			url: "http://tesisenxarxa.net/handle/10803/7571"
    		},
    		{
    			name: "PhD + Work @ Bestiario",
    			init: 28.75,
    			end: 29.85
    		},
    		{
    			name: "Work @ Bestiario",
    			init: 29.85,
    			end: 31.85,
    			url: "http://www.bestiario.org"
    		},
    		{
    			name: "Sabbatical",
    			init: 31.85,
    			end: 32.35,
    			url: "http://myway.vpascual.org"
    		},
    		{
    			name: "Freelance",
    			init: 32.35,
    			end: 32.6,
    			url: "http://www.vpascual.org"
    		},
    		{
    			name: "Data Scientist @ Mobile Media Content & SIRIS Academic",
    			init: 32.35,
    			end: 33.5,
    			url: "http://www.mobilemediacontent.com",
    			url2: "http://www.sirisacademic.com"
    		},
    		{
    			name: "Data Scientist @ SIRIS Academic",
    			init: 32.35,
    			end: 34.6,
    			url: "http://www.sirisacademic.com"
    		},
    		{
    			name: "Freelance",
    			init: 34.6,
    			end: daysBetweenDates('Oct 15, 1981 00:00:00', new Date()) / 365,
    			url: "http://www.vpascual.org"
    		}];

    		var data = [];    		

    		values.forEach(function(d) {
    			d.weekInit = decimalYearToWeek(d.init);
    			d.weekEnd = decimalYearToWeek(d.end);
    		});

    		values.forEach(function(d) {
    			for (var i = d.weekInit; i<d.weekEnd; i++)
    				data.push(d)
    		});
    		
    		while (data.length < 85*52) {
    			data.push({name: 'To be enjoyed!'})
    		};        

    this.getData = function() {
    	return data;
    }
  }]);
