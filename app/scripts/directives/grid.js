'use strict';

/**
 * @ngdoc directive
 * @name lifeWeeksApp.directive:grid
 * @description
 * # grid
 */
angular.module('lifeWeeksApp')
  .directive('grid', function () {
    return {
      template: '<div id="viz"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var width = 600,
        		height = 800,
        		cell_width = width / 52,
        		cell_height = height / 85;

				var viz = d3.select(element[0]).select("#viz");
				console.log(viz)
			  var svg = viz
			  	.append("svg")
			  		.attr("width", width)
			  		.attr("height", height);

			  console.log(svg)
			  console.log(d3.select("#viz"))

			  var year = svg.selectAll("g")
			  	.data(d3.range(1, 85))
			  	.enter()
			  	.append("g")
			  		.attr("class", "year")
			  		.attr("transform", function(d, i) {
			  			console.log(cell_height)
			  			return "translate(0, " + cell_height * i + ")"
			  		});


				year.selectAll("rect")
					.data(d3.range(1, 52))
					.enter()
					.append("rect")
						.attr("class", "week")
						.attr("x", function(d, i) { 
							return i*cell_width;
						})
						.attr("y", 0)
						.attr("width", cell_width)
						.attr("height", cell_height)
						//.attr("fill", "steelblue")
						.on("mouseover", function(d) {
							console.log(d)
							console.log(d3.select(this.parentNode).data()[0])
						})
      }
    };
  });
