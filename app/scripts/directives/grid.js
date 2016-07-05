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
				
				var tooltip = viz.append("div")	
			    .attr("class", "tooltip")				
			    .style("opacity", 0);    		

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
						.on("mouseover", function(d) {		
							var week = d;
							var year = d3.select(this.parentNode).data()[0];
	            tooltip.transition()		
	                .duration(200)		
	                .style("opacity", .9);		
	            tooltip.html("Year: " + year + "<br/>"  + week)	
	                .style("left", (d3.event.pageX) + "px")		
	                .style("top", (d3.event.pageY - 28) + "px");	
            })					
		        .on("mouseout", function(d) {		
		            tooltip.transition()		
		                .duration(500)		
		                .style("opacity", 0);	
		        });
      }
    };
  });
