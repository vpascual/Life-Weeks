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

        // this is to ease the data entering process
        // it converts years expressed in decimals to weeks
    		var decimalYearToWeek = d3.scaleLinear()
    			.domain([0, 85])
    			.rangeRound([0, 85*52]);

    		var color = d3.scaleOrdinal(d3.schemeCategory20);

    		var values = [
    		{
    			name: "Early years",
    			init: 0,
    			end: 4
    		},
    		{
    			name: "Elementary school",
    			init: 4,
    			end: 8
    		},
    		{
    			name: "Middle school",
    			init: 8,
    			end: 14
    		},
    		{
    			name: "High school",
    			init: 14,
    			end: 18.3
    		}];

    		var data = [];    		

    		values.forEach(function(d) {
    			d.weekInit = decimalYearToWeek(d.init);
    			d.weekEnd = decimalYearToWeek(d.end);
    		});

    		values.forEach(function(d) {
    			for (var i = d.weekInit; i<d.weekEnd; i++)
    				data.push(d)
    		})
    		
    		while (data.length < 85*52) {
    			data.push({name: 'To be enjoyed!'})
    		}

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
			  	.data(data)
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
							if (d.name == 'To be enjoyed!')
								return 'lightgray';

							return color(d.name);
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
            })			
            .on("mousemove", function() {
            	tooltip.style("top", (d3.event.pageY - 30) + "px").style("left", (d3.event.pageX + 15) + "px");
            })		
		        .on("mouseout", function(d) {		
		            tooltip.transition()		
		                .duration(500)		
		                .style("opacity", 0);	
		        })
		        .transition(t)
		        	.attrTween("x", function(d, i) {
		        		return d3.interpolateNumber(this.getAttribute("x"), x(weekValue(i)))
		        	})
		        	.attrTween("y", function(d, i) {
		        		return d3.interpolateNumber(this.getAttribute("y"), y(yearValue(i)))
		        	});
	        
      }
    };
  });
