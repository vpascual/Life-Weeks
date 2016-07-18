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
      scope: {
        data: '='
      },
      link: function postLink(scope, element, attrs) {
            scope.$watch('data', function() {
                update();
            })

            var margin = {top: 20, right: 10, bottom: 10, left: 20};
            var width = 600 - margin.left - margin.right,
                height = 800 - margin.top - margin.bottom,
        		cell_width = width / 52,
        		cell_height = height / 85;                

            var color = d3.scaleOrdinal(d3.schemeCategory20);
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
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  		svg.append("g")
			    .attr("class", "axis")
			    //.attr("transform", "translate(0," + height + ")")
			    .call(d3.axisLeft(y));

			  function setColor(d) {
			  	if (d.name == 'To be enjoyed!')
								return 'lightgray';

							return color(d.name);
			  }

			var week = undefined;

            function update() {
                svg.selectAll("rect")
    			  	.data(scope.data)
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
    					.attr("fill", function(d) {
    						return setColor(d);
    					})
    					.style("opacity", function(d) {
    						return d.name == 'To be enjoyed!' ? 0.5 : 1;
    					})
    					.on("mouseover", function(d, i) {
            	            tooltip.transition()		
            	                .duration(200)		
            	                .style("opacity", .9);
            	            var html = d.name + "<br>Age: " + yearValue(i) + "<br/>Week: "  + weekValue(i);
            	            //html = d3.select(this).attr("fill") == 'lightgray' ? '' : '<br>d.name'
            	            tooltip.html(html);

            	            var currentColor = d3.select(this).attr("fill");	            
            	            d3.select(this).attr("fill", function(d) { 
            	            	return d3.color(currentColor).darker(); 
            	            });

            	            if (d.url != undefined)
            	            	d3.select(this).style("cursor", "hand");
                        })			
                        .on("mousemove", function() {
                        	tooltip.style("top", (d3.event.pageY - 30) + "px").style("left", (d3.event.pageX + 15) + "px");
                        })		
        		        .on("mouseout", function(d) {		
        		            tooltip.transition()		
        		                .duration(500)		
        		                .style("opacity", 0);

        		            d3.select(this).attr("fill", function(d) { return setColor(d); })
        		        })
        		        .on("click", function(d) {
        		        	if (d.url != undefined) {
        		        		if (d.url2 != undefined) {
        		        			var url = Math.random() < 0.5 ? d.url : d.url2;
        		        			window.open(url)
        		        		} else
        		        			window.open(d.url)
        		        	}
        		        })
        		        .transition(t)
        		        	.attrTween("x", function(d, i) {
        		        		return d3.interpolateNumber(this.getAttribute("x"), x(weekValue(i)))
        		        	})
        		        	.attrTween("y", function(d, i) {
        		        		return d3.interpolateNumber(this.getAttribute("y"), y(yearValue(i)))
        		        	});
            }
	        
      }
    };
  });
