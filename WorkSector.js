function init(){
	var w = 1000;
	var h = 500;
	var padding = 50;
	var dataset;
	var stack;
	var series;
	var xScale;
	var yScale;
	var color;
	var svg;
	var group;
	var rect;
	var data5559 = [];
	var data6064 = [];
	var data65above = [];
	
	
	 
	d3.csv("industry2.csv").then(function(data){
		dataset = data;
		console.log(dataset);
	
		
		
		
	stack = d3.stack()
			  .keys(["age5559","age6064","age65above"])
			  .order(d3.stackOrderAscending);
			  
	series = stack(dataset);
	console.log (series);
	
	xScale = d3.scaleBand()
			   .domain(d3.range(dataset.length))
			   .range([padding,w])
			   .paddingInner(0.05);
			   
	yScale = d3.scaleLinear()
			   .domain([0,40])
			   .range([h,0]);
			   
	color = d3.scaleOrdinal(d3.schemeCategory10);
	
	svg = d3.select("body")
			.append("svg")
			.attr("width",w+60)
			.attr("height",h+60);
			
	group = svg.selectAll("g")
				.data(series)
				.enter()
				.append("g")
				.style("fill",function(d,i){
					return color(i);
				});
				
	rect = group.selectAll("rect")
				  .data(function(d){
					  return d;
				  })
				  .enter()
				  .append("rect")
				  .attr("x",function(d,i){
					  
					  return xScale(i) ;
				  })
				  .attr("y",function(d){

					  return yScale(d[1]) - padding -20;
				  })
				  
				  .attr("height",function(d){
					  return (yScale(d[0]) - yScale(d[1]));
				  })
				  .attr("width",xScale.bandwidth())
				  .append("title")
				.text(function(d) {
			   		return (d[1] - d[0]);
			   });
				  
				  
	
					  
	
	var xAxis = d3.axisBottom(xScale)
				  .tickFormat(function(d){return dataset[d].Industry;});
								
				  
	svg.append("g")
	   .attr("transform","translate(0,"+(h-padding-20)+")")
	   .call(xAxis)
	   .selectAll("text")
	   .attr("y", 0)
       .attr("x", 9)
       .attr("dy", "0.35em")
       .attr("transform", "rotate(45)")
       .style("text-anchor", "start")
	   .style("font-size", "15px");
	   
	 var yAxis = d3.axisLeft(yScale)
				   .ticks(7);
	 
	svg.append("g")
	   .attr("transform","translate("+padding+",-70)")
       .call(yAxis);
	   
	svg.append("text")
	.attr("x",(w/4))
	.attr("y",50)
	.style("font-size","26px")
	.style("text-decoration","underline")
	.text("Work Sector Percentages in Old-Age Australians");
	
	svg.append("circle")
	.attr("cx",(w-80))
	.attr("cy",200)
	.attr("r",15)
	.attr("fill","green");
	
	svg.append("text")
	.attr("x",(w-padding - 10))
	.attr("y",130)
	.text("Age Group 55-59");
	
	svg.append("circle")
	.attr("cx",(w-80))
	.attr("cy",160)
	.attr("r",15)
	.attr("fill","orange");
	
	svg.append("text")
	.attr("x",(w-padding - 10))
	.attr("y",170)
	.text("Age Group 60-64");
	
	svg.append("circle")
	.attr("cx",(w-80))
	.attr("cy",120)
	.attr("r",15)
	.attr("fill","blue");
	
	svg.append("text")
	.attr("x",(w-padding - 10))
	.attr("y",210)
	.text("Age Group 65+");
	
	d3.select("#age5559")
		.on("click",function(){
     		data.map(function(d){
				if(data5559.length<=18){
				data5559.push(d.age5559);}
				
})
console.log(data5559);
	svg.selectAll("rect")
	   .remove()
	   .exit()
	   .data(data5559)
	   .enter()
	   .append("rect")
	   .attr("x",function(d,i){
		   return xScale(i) ;
	   })
	   .attr("y",function(d){
		   return yScale(d) -padding - 20;
	   })
	   .attr("width", xScale.bandwidth())
	   .attr("height",function(d){
			return h - yScale(d);
		})
		.attr("fill","blue")
		.append("title")
				.text(function(d) {
			   		return (d);
			   });
		
          });
	d3.select("#age6064")
		  .on("click",function(){
			  data.map(function(d){
				  if(data6064.length<=18){
				  data6064.push(d.age6064);}
})
console.log(data6064);
svg.selectAll("rect")
	   .remove()
	   .exit()
	   .data(data6064)
	   .enter()
	   .append("rect")
	   .attr("x",function(d,i){
		   return xScale(i) ;
	   })
	   .attr("y",function(d){
		   return yScale(d) -padding - 20;
	   })
	   .attr("width", xScale.bandwidth())
	   .attr("height",function(d){
			return h - yScale(d);
		})
		.attr("fill","orange")
		.append("title")
				.text(function(d) {
			   		return (d);
			   });

	
		
				

		  });
	d3.select("#age65above")
		  .on("click",function(){
			  data.map(function(d){
				  if(data65above.length<=18){
				  data65above.push(d.age65above);}
})
console.log(data65above);

svg.selectAll("rect")
	   .remove()
	   .exit()
	   .data(data65above)
	   .enter()
	   .append("rect")
	   .attr("x",function(d,i){
		   return xScale(i) ;
	   })
	   .attr("y",function(d){
		   return yScale(d) -padding - 20;
	   })
	   .attr("width", xScale.bandwidth())
	   .attr("height",function(d){
			return h - yScale(d);
		})
		.attr("fill","green")
		.append("title")
				.text(function(d) {
			   		return (d);
			   });


		  });
					
	});
}

window.onload = init;