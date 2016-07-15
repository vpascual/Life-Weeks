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

        function daysBetweenDates(d1, d2) {
        	console.log("daysBetweenDates")
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
			  		.attr("height", height)
			  		.append("g")
			  			.attr("transform", "translate(20,0)");

	  		svg.append("g")
			    .attr("class", "axis")
			    //.attr("transform", "translate(0," + height + ")")
			    .call(d3.axisLeft(y));

			  function setColor(d) {
			  	if (d.name == 'To be enjoyed!')
								return 'lightgray';

							return color(d.name);
			  }

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
    };
  });
