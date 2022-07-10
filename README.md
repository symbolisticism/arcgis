# Overview

I, being interested in the world of GIS programming, decided to take on a simple project to learn the basics of how to use GIS to plot relevant data and see connections. I thought it would be a good intro into a growing field. Data collection, analyzation, and use for improved systems is a big industry currently, and I want to know what it's like to be a part of it.

I wrote some software for a map using a tutorial from Chad Macbeth that plots earthquakes from the last week all over a map. The program makes use of a JSON file provided by the ARCGIS API that stays updated on the most recent earthquakes. There is also a simple HTML file that is made just to hold the information populated by the JavaScript that runs the map program. You use the software by going to the website (or in my case, you go to the local server on my machine), and the page automatically loads all the points with their information. You can click on each individual point to see its information and know more about it. In this case, the additional information is the magnitude and location of each earthquake.

My purpose for writing this software, as stated above, was to learn and gain an experience in a field that I might be interested in. The only way to know if you're interested in something is if you try it. I wanted to know how it worked, how it could be applied, and how it could benefit people.

{Provide a link to your YouTube demonstration.  It should be a 4-5 minute demo of the software running and a walkthrough of the code.}

[Software Demo Video](http://youtube.link.goes.here)

# Development Environment

For this project, I used VS Code with a Live Server extension. I built both the HTML and the JavaScript within VS Code. I also used the ARCGIS API documentation to learn more about how to put this together.

I used HTML and JavaScript. In my code were included the modules Map, MapView, Graphic, GraphicsLayer, FeatureLayer, Locate, Search, and Legend.

# Useful Websites

* [ArcGIS Developers](https://developers.arcgis.com/documentation/mapping-apis-and-services/tutorials/)
* [W3Schools](https://www.w3schools.com/js/)

# Future Work

* This program would do well with some features that make it easier to identify the size of the earthquake through the size of the point on the map
* Item 3
* Item 3
