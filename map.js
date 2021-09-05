class map_widget_1 {
  constructor(map_path, svg, projection, function_click) {
    this.map_path = map_path;
    this.svg=svg;
    this.function_click=function_click;
    this.projection=projection;
  }
  
  draw(countries_list){
    var array_select = [];
    var array_elem = [];
    const that=this;

    d3.json(this.map_path, function (data) {
        data.features = data.features.filter(function (d) { return countries_list.includes(d.properties.name) })
        svg.append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("fill", "grey")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "none")
            .on('click',function(d){
                if (array_elem.length > 0) {
                    var prevelem = array_elem.shift();
                    prevelem.style('fill', 'grey');
                    array_select.shift();
                }
                d3.select(this).style("fill", '#ccffcc');
                array_elem.push(d3.select(this));
                array_select.push(d.properties.name);
                that.function_click(d.properties.name);
            });        
  });
  }
}
