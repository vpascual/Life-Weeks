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

        var yearValue = function(d) { return Math.floor(d/52); };
        var weekValue = function(d) { return d%52; };

        var t = d3.transition()
    			.duration(4000);

    		var x = d3.scaleLinear()
    			.domain([0, 52])
    			.range([0, width]);

    		var y = d3.scaleLinear()
    			.domain([0, 85])
    			.range([0, height]);

				var viz = d3.select(element[0]).select("#viz");
				
				var tooltip = viz.append("div")	
			    .attr("class", "tooltip")				
			    .style("opacity", 0);    		

			  var svg = viz
			  	.append("svg")
			  		.attr("width", width)
			  		.attr("height", height);

			  var week = svg.selectAll("rect")
			  	.data(d3.range(0, 85 * 52))
			  	.enter()
			  	.append("rect")
				  	.attr("class", "week")						
						.attr("width", cell_width)
						.attr("height", cell_height)
						.attr("x", function(d, i) { 
								return Math.random() * width;
							})
						.attr("y", function(d, i) { 
							return Math.random() * height;
						})
						.on("mouseover", function(d) {		
							var week = d;
							var year = d3.select(this.parentNode).data()[0];
	            tooltip.transition()		
	                .duration(200)		
	                .style("opacity", .9);		
	            tooltip.html("Age: " + yearValue(d) + "<br/>Week: "  + weekValue(d));
            })			
            .on("mousemove", function() {
            	tooltip.style("top", (d3.event.pageY - 30) + "px").style("left", (d3.event.pageX + 10) + "px");
            })		
		        .on("mouseout", function(d) {		
		            tooltip.transition()		
		                .duration(500)		
		                .style("opacity", 0);	
		        })
		        .transition(t)
		        	.attrTween("x", function(d) {
		        		return d3.interpolateNumber(this.getAttribute("x"), x(weekValue(d)))
		        	})
		        	.attrTween("y", function(d) {
		        		return d3.interpolateNumber(this.getAttribute("y"), y(yearValue(d)))
		        	});
	        
      }
    };
  });
