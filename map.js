// ArcGIS libraries use AMD format.  To use the libraries, 
// we specify a list of modules (e.g. Map, MapView) in a list
// with the require.  The second parameter defines a function
// that will use these modules.  We specify the module names
// in order in the function parameter list.  When this javascript
// file is loaded by the html, it will run this function using these
// modules.

// Read more here: https://dojotoolkit.org/documentation/tutorials/1.10/modules/index.html

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/widgets/Legend"	
  ], function(Map, MapView, Graphic, GraphicsLayer, FeatureLayer, Locate, Search, Legend) {

        // Create a basemap for the map view
        var myMap = new Map({
            basemap: "streets-night-vector"
    });


        // Create a map view for the HTML using the basemap
        // previously created.
        var myView = new MapView({
            container: "viewDiv",
            map: myMap,
            zoom: 3
    });


        // Create a Graphics Layer which can be used to draw graphics
        // on the map
        var graphicsLayer = new GraphicsLayer();
        myMap.add(graphicsLayer);


        // We will use the XMLHttpRequest object to read data from the USGS
        // server and populate graphics on our map based on the results
        // https://www.w3schools.com/js/js_ajax_http.asp
        var xmlhttp = new XMLHttpRequest();

        // This long function below is what will happen when we get a result
        // The actual sending of the http request and reading response occurs
        // after the definition of this function.
        xmlhttp.onreadystatechange = function() {
            // Did we get a response (4) and was the response successful (200)
            if (this.readyState == 4 && this.status == 200) {
                
                // Convert the JSON text to JSON object that we
                // can loop through
                var data = JSON.parse(this.responseText);

                // The structure of the earthquake data can be found
                // at the USGS website:
                // https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
                
                // Loop through each feature in the features list
                for (feature of data.features) {    

                    // Determine symbol color based on the earthquake magnitude
                    var mag_color;
                    var mag = feature.properties.mag;
                    if (mag > 6) {
                        mag_color = [168,78,50]; // Red
                    }
                    else if (mag > 4) {
                        mag_color = [247,241,54]; // Yellow
                    }
                    else if (mag > 2) {
                        mag_color = [52,168,50]; // Green
                    }
                    else {
                        mag_color = [50, 54, 168]; // Blue
                    }

                    // Create a marker
                    // This JS map is expected by ArcGIS to make a graphic                 
                    var marker = {
                        type: "simple-marker",
                        style: "triangle",
                        color: mag_color
                    };


                    // Define location to draw
                    // This JS map is expected by ArcGIS to make a graphic
                    var location = {
                        type: "point",
                        longitude: feature.geometry.coordinates[0],
                        latitude: feature.geometry.coordinates[1]
                    };



                    // Define attributes for us in popup template.  The popup
                    // template uses {}'s to access items in the attributes map.
                    // The template content also supports HTML tags.
                    var popup_attributes = {
                        mag: feature.properties.mag,
                        place: feature.properties.place
                    };

                    var popup_template = {
                        title: "Earthquake",
                        content: "<b>Mag:</b> {mag}<br><b>Location:</b> {place}"
                    }



                    // Combine location and symbol to create a graphic object
                    // Also include the attributes and template for popup
                    var graphic = new Graphic({
                        geometry: location,
                        symbol: marker,
                        attributes: popup_attributes,
                        popupTemplate: popup_template
                    });



                    // Add the graphic (with its popup) to the graphics layer
                    graphicsLayer.add(graphic)

                } // End of Loop

            }
        }; // End of XML Call back Function

        // Time to actually send the GET request to the USGS.  When we get a response
        // it will call and execute the function we defined above.
        xmlhttp.open("GET", "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", true);
        xmlhttp.send();

        
        myView.popup.defaultPopupTemplateEnabled = true;   

        var volcanoLayer = new FeatureLayer({
            url: "https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/test_Significant_Global_Volcanic_Eruptions_1/FeatureServer"
        });

        var faultsLayer = new FeatureLayer({
            url: "https://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/Sean_View_6/FeatureServer"
        });

        myMap.add(volcanoLayer);
        myMap.add(faultsLayer);

        // Create a locate me button
            
        var locate = new Locate({
            view: myView,
            useHeadingEnabled: false,
            goToOverride: function(view, options) {
                options.target.scale = 1000000;  // 1/1000000 scale
                return view.goTo(options.target);
              }
        });
        
    myView.ui.add(locate, "top-left");

        // Create a Search Bar
           
        var search = new Search({
            view: myView
        });
    
    myView.ui.add(search, "top-right");

        // Create a Legend for the Feature Layers
        
        var legend = new Legend({
            view: myView,
            layerInfos: [{
                layer: volcanoLayer,
                title: "Volcano Legend"
            }, {
                layer: faultsLayer,
                title: "Faults Legend"
            }]
        });
        
    myView.ui.add(legend, "bottom-left");


});