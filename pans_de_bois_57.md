
<script src="https://d3js.org/d3.v4.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script src="https://d3js.org/d3-geo-projection.v2.min.js"></script>
<body>
	<div class="container-fluid">
		<div class="row justify-content-center mt-5">
			<p>Test map widget</p>
		</div>
		<div class="row justify-content-center mt-5">
			<div class="col-lg-9">
				<svg id="map" width="1000" height="1000"></svg>
			</div>
			<div class="col-lg-3">
				<p id='country'></p>
			</div>
		</div>
	</div>
    <script>
		function filtre_densite(d){
			if (liste_forte_densite.includes(d.properties.nom)){
				return "orange";
			}
			else if(liste_pans_de_bois.includes(d.properties.nom)){
				return 'yellow';
			}
			else{
				return "white";
			}}

		function filtre_estriche(d){
			if (liste_estriche.includes(d.properties.nom)){
				return 'url(#estriche)';
			}
			else{
				return "none";
			}}

		function filtre_etat(d){
			
			if (d.etat==='détruite'){
				
				return 'black';
			}
			else{
				console.log(d.etat);
				return "blue";
			}}
	
		var villes =[{"nom":"METZ", "latitude":49.11786650630533, "longitude":6.175117885382534},{"nom":"SARRE-UNION", "latitude":48.936884421023564, "longitude":7.089663647975013},{"nom":"SARREGUEMINES", "latitude":49.11032601065116,"longitude":7.066576437687605},
					{"nom":"SAVERNE", "latitude":48.74029363172143,"longitude":7.362608310052653},{"nom":"BITCHE", "latitude":49.05248220465629,"longitude":7.429189337193001},{"nom":"SARREBOURG","latitude":48.7354354311496, "longitude":7.053140682483391}]
	
		var liste_estriche=['Hellimer','Rettel','Freistroff','Cocheren','Roupeldange','Cappel','Biding',
							'Hambach','Bining','Narbéfontaine','Fouligny','Marange-Zondrange','Altrippe',
							'Bérig-Vintrange','Grostenquin','Haute-Vigneulles','Bambiderstroff','Hoste','Honskirch',
							'Erstroff','Hazembourg','Puttelange-aux-Lacs','Hallering','Le Val-de-Guéblange']
	
		var liste_forte_densite=['Kappelkinger','Loudrefing','Belles-Forêts','Desseling','Insviller','Vibersviller','Altwiller','Guermange'];
		
		var liste_pans_de_bois=['Cappel','Hoste','Leyviller','Réning','Siersthal','Éguelshardt','Philippsbourg','Baerenthal','Bitche','Hellimer','Soucht','Hinsingen','Hérange',
                    'Mittersheim','Fénétrange','Insming','Kirviller','Ernestviller','Munster','Vittersbourg', 'La Petite-Pierre','Erckartswiller','Reipertswiller', 'Wimmenau','Volksberg','Rosteig','Petersbach',
                    'Sarralbe','Assenoncourt','Vic-sur-Seille','Herbitzheim','Sarre-Union','Schopperten',
                    'Harskirchen','Petersbach','Drulingen','Diemeringen','Willerwald','Hambach','Le Val-de-Guéblange','Givrycourt','Sarreguemines','Rorbach-lès-Dieuze',
					'Kirrberg','Sarreinsming','Ratzwiller','Altrippe','Romelfing','Bermering','Saint-Jean-Rohrbach',
                  'Rahling','Schalbach','Eywiller','Nelling','Siltzheim','Domfessel','Lohr','Ratzwiller','Volksberg','Neufvillage',
                  'Waldhambach','Weislingen','Bissert','Gosselming','Honskirch','Holving','Rémering-lès-Puttelange','Petit-Tenquin','Bining','Francaltroff','Neufgrange','Petit-Réderching', 'Grundviller','Brouviller','Zilling','Languimberg'];
	
        var list_countries = ["Germany", "France"];
        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");
        var projection = d3.geoMercator()
            .center([6.9, 49])               
            .scale(40000)                     
            .translate([width / 2, height / 2])

		svg
		  .append('defs')
		  .append('pattern')
			.attr('id', 'estriche')
			.attr('patternUnits', 'userSpaceOnUse')
			.attr('width', 4)
			.attr('height', 4)
		  .append('path')
			.attr('d', 'M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2')
			.attr('stroke', '#000000')
			.attr('stroke-width', 1);
			
			
		d3.json('map_57_67.geojson', function (data) {	
			svg.append("g")
				.selectAll("path")
				.data(data.features)
				.enter()
				.append("path")
				.attr("fill", function(d){return filtre_densite(d)})
				.attr("d", d3.geoPath()
					.projection(projection)
				)
				.style("stroke", "grey")
				
			svg.append("g")
				.selectAll("path")
				.data(data.features)
				.enter()
				.append("path")
				.attr("fill", function(d){return filtre_estriche(d)})
				.attr("d", d3.geoPath()
					.projection(projection)
				)
				.style("stroke", "grey")
		});
		
	


	
		d3.json('map_limits_57_67.geojson', function (data) {	
			svg.append("g")
				.selectAll("path")
				.data(data.features)
				.enter()
				.append("path")
				.attr("d", d3.geoPath()
					.projection(projection)
				)
				.attr("fill", "none")
				.style("stroke", "grey")
				.style("stroke-width","8")
		});
	
		d3.json('isoglosse_p_pf.geojson', function (data) {	
			svg.append("g")
				.selectAll("path")
				.data(data.features)
				.enter()
				.append("path")
				.attr("fill", "none")
				.attr("d", d3.geoPath()
					.projection(projection)
				)
				.style("stroke", "blue")
				.style("stroke-dasharray","5,5")
				.style("stroke-width","8")
		});


		d3.json('frontiere_tuiles.geojson', function (data) {	
			svg.append("g")
				.selectAll("path")
				.data(data.features)
				.enter()
				.append("path")
				.attr("fill", "none")
				.attr("d", d3.geoPath()
					.projection(projection)
				)
				.style("stroke", "red")
				.style("stroke-width","8")
		});

		d3.json('frontiere_linguistique.geojson', function (data) {	
			svg.append("g")
				.selectAll("path")
				.data(data.features)
				.enter()
				.append("path")
				.attr("fill", "none")
				.attr("d", d3.geoPath()
					.projection(projection)
				)
				.style("stroke", "green")
				.style("stroke-dasharray","5,5")
				.style("stroke-width","8")
		});
		
				
		d3.json('remarquables.json', function (err,data) {
			svg.append("g")
				.selectAll("circle")
				.data(data)
				.enter()
				.append("circle")	
				.attr("cx", function(d){return projection([d.longitude, d.latitude])[0]})       
				.attr("cy", function(d){return projection([d.longitude, d.latitude])[1]})          
				.attr("r", 10)             
				.style("fill", function(d){return filtre_etat(d)})
				.on('click',function(d){
					document.getElementById("country").innerHTML="";

					var h2 = document.createElement("h2");
					var h4 = document.createElement("h4");
					var desc = document.createElement("h5");
					h2.innerHTML=d.commune;
					h4.innerHTML=d.entete;
					desc.innerHTML=d.description;
					
					var img = document.createElement("img");
					img.src= d.image;
					img.width= 300;
					document.getElementById("country").appendChild(h2);
					document.getElementById("country").appendChild(h4);
					document.getElementById("country").appendChild(img);
					document.getElementById("country").appendChild(desc);
				}); 
		})

		var layer_text = svg.append("g")
			.selectAll("text")
			.data(villes)
			.enter()
			.append("text")
			.attr("x", function(d){return projection([d.longitude-0.05, d.latitude])[0]})       
			.attr("y", function(d){return projection([d.longitude-0.05, d.latitude])[1]})
			.attr("dy", ".35em")
			.text(function(d) { return d.nom; });

    </script>
</body>
