require(['jquery', 'leaflet.draw'], function ($) {
    //alert("map");
    var indexScript = function () {
        this.init();
    };

    indexScript.prototype.init = function () {
        //do stuff with bootstrap
    };

    //create object on DOM ready
    $(function () {

        var selectedLayer;
        var selectedProperties = {
            "features": [
              {
                  "geometry": {
                      "coordinates": [
                        -90.9416736,
                        30.5031428
                      ],
                      "type": "Point"
                  },
                  "properties": {
                      "parcelNumb": "333435",
                      "address": "1505 ANDERSON DR",
                      "streetAddress": "1505 ",
                      "streetName": "ANDERSON ",
                      "streetSuffix": "DR",
                      "city": "DENHAM SPRINGS",
                      "state": "LA",
                      "zipcode": "70726",
                      "lat": "30.5031428",
                      "long": "-90.9416736",
                      "status": "Geocoded - Denham Springs Inside SFHA",
                      "flD_ZONE": "AE",
                      "floodway": "",
                      "bfe": "49",
                      "firM_DATE": "41002",
                      "firM_PAN": "22063C0115E",
                      "suffix": "E",
                      "geom": "SRID=4326;POINT (-90.9417 30.5031)"
                  },
                  "type": "Feature"
              },
              {
                  "geometry": {
                      "coordinates": [
                        -90.941675,
                        30.5031606
                      ],
                      "type": "Point"
                  },
                  "properties": {
                      "parcelNumb": "333450",
                      "address": "1515 ANDERSON DR",
                      "streetAddress": "1515 ",
                      "streetName": "ANDERSON ",
                      "streetSuffix": "DR",
                      "city": "DENHAM SPRINGS",
                      "state": "LA",
                      "zipcode": "70726",
                      "lat": "30.5031606",
                      "long": "-90.941675",
                      "status": "Geocoded - Denham Springs Inside SFHA",
                      "flD_ZONE": "AE",
                      "floodway": "",
                      "bfe": "49",
                      "firM_DATE": "41002",
                      "firM_PAN": "22063C0115E",
                      "suffix": "E",
                      "geom": "SRID=4326;POINT (-90.9417 30.5032)"
                  },
                  "type": "Feature"
              },
              {
                  "geometry": {
                      "coordinates": [
                        -90.941673,
                        30.5031357
                      ],
                      "type": "Point"
                  },
                  "properties": {
                      "parcelNumb": "334847",
                      "address": "1501 ANDERSON DR",
                      "streetAddress": "1501 ",
                      "streetName": "ANDERSON ",
                      "streetSuffix": "DR",
                      "city": "DENHAM SPRINGS",
                      "state": "LA",
                      "zipcode": "70726",
                      "lat": "30.5031357",
                      "long": "-90.941673",
                      "status": "Geocoded - Denham Springs Inside SFHA",
                      "flD_ZONE": "AE",
                      "floodway": "",
                      "bfe": "49",
                      "firM_DATE": "41002",
                      "firM_PAN": "22063C0115E",
                      "suffix": "E",
                      "geom": "SRID=4326;POINT (-90.9417 30.5031)"
                  },
                  "type": "Feature"
              },
              {
                  "geometry": {
                      "coordinates": [
                        -90.9416559,
                        30.5029263
                      ],
                      "type": "Point"
                  },
                  "properties": {
                      "parcelNumb": "358085",
                      "address": "1516 ANDERSON DR",
                      "streetAddress": "1516 ",
                      "streetName": "ANDERSON ",
                      "streetSuffix": "DR",
                      "city": "DENHAM SPRINGS",
                      "state": "LA",
                      "zipcode": "70706",
                      "lat": "30.5029263",
                      "long": "-90.9416559",
                      "status": "Geocoded - Denham Springs Inside SFHA",
                      "flD_ZONE": "AE",
                      "floodway": "",
                      "bfe": "49",
                      "firM_DATE": "41002",
                      "firM_PAN": "22063C0115E",
                      "suffix": "E",
                      "geom": "SRID=4326;POINT (-90.9417 30.5029)"
                  },
                  "type": "Feature"
              },
              {
                  "geometry": {
                      "coordinates": [
                        -90.9416739,
                        30.5031464
                      ],
                      "type": "Point"
                  },
                  "properties": {
                      "parcelNumb": "359182",
                      "address": "1507 ANDERSON DR",
                      "streetAddress": "1507 ",
                      "streetName": "ANDERSON ",
                      "streetSuffix": "DR",
                      "city": "DENHAM SPRINGS",
                      "state": "LA",
                      "zipcode": "70726",
                      "lat": "30.5031464",
                      "long": "-90.9416739",
                      "status": "Geocoded - Denham Springs Inside SFHA",
                      "flD_ZONE": "AE",
                      "floodway": "",
                      "bfe": "49",
                      "firM_DATE": "41002",
                      "firM_PAN": "22063C0115E",
                      "suffix": "E",
                      "geom": "SRID=4326;POINT (-90.9417 30.5031)"
                  },
                  "type": "Feature"
              }
            ],
            "type": "FeatureCollection"
        };

        var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';

        var grayscale = L.tileLayer(mbUrl, { id: 'mapbox.light', attribution: mbAttr });
        var streets = L.tileLayer(mbUrl, { id: 'mapbox.streets', attribution: mbAttr });
        var openstreets = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { id: 'open.streets', attribution: '© OpenStreetMap contributors | Tiles Courtesy of MapQuest ' });
        var esriimagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { id: 'esri.imagery', attribution: '&copy; <a href="http://www.esri.com/">Esri</a>i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' })
        var entryPoint = new indexScript();
        var map = L.map('map', {
            center: [30.4772, -90.95418],
            minZoom: 2,
            maxNativeZoom: 20,
            zoom: 13,
            layers: [openstreets]
        });


        //L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
        //    attribution: '© OpenStreetMap contributors | Tiles Courtesy of MapQuest ',
        //    subdomains: ['otile1', 'otile2', 'otile3', 'otile4']
        //}).addTo(map);
        //L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //    attribution: '© OpenStreetMap contributors | Tiles Courtesy of MapQuest '
        //}).addTo(map);

        var baseLayers = {
            "Grayscale": grayscale,
            "Streets": openstreets,
            "Esri Imagery": esriimagery
        };

        L.control.layers(baseLayers).addTo(map);


        //get properties
        $.ajax(
            {
                type: "GET",
                url: "/Map/GetPropertyList",
                //dataType: 'json',
                //data: JSON.stringify(bounds),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    parseResponse(result)
                },
                error: function (req, status, error) {
                    alert("Unable to get property data");
                }
            });

        map.on('click', function (e) {
            
            $("#lat").html(e.latlng.lat);
            $("#lng").html(e.latlng.lng);
        });


        //draw stuff
        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
        var drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
                polyline: false,
                polygon: true,
                circle: false,
                marker: true
            },
            edit: {
                featureGroup: drawnItems,
                remove: true
            }
        });
        map.addControl(drawControl);
        map.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;
            //if (type === 'marker') {
            //    layer.bindPopup('A popup!');
            //}
            //drawnItems.addLayer(layer);

            //find properties that intersect with the drawing area
            $.ajax(
            {
                type: "POST",
                url: "/Map/FindIntersect1",
                //dataType: 'json',
                data: JSON.stringify( e.layer._latlngs),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    selectProperties(result);
                    
                },
                error: function (req, status, error) {
                    alert("Error ");
                }
            });


        });

        function parseResponse(data) {
                        
            L.geoJson(JSON.parse(data), {
                onEachFeature: onEachFeature,
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 5,
                        fillColor: "#ff7800",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                }

            }).addTo(map);
            //consol.log(data);
        }

        function onEachFeature(feature, layer) {
            var popupContent = '';
            if (feature.properties) {
                popupContent += '<div><label class="text-primary" >Address:&nbsp;&nbsp;</label><label class="text-default" >' + feature.properties['address'] + '</label></div>';
                popupContent += '<div><label class="text-primary" >Parcel Number:&nbsp;&nbsp;</label><label class="text-default" >' + feature.properties['parcelNumb'] + '</label></div>';
                popupContent += '<div><label class="text-primary" >BFE:&nbsp;&nbsp;</label><label class="text-default" >' + feature.properties['bfe'] + '</label></div>';
                popupContent += '<div><label class="text-primary" >Status:&nbsp;&nbsp;</label><label class="text-default" >' + feature.properties['status'] + '</label></div>';

            }
            
            layer.bindPopup(popupContent);
            layer.on('mouseover', function () { layer.openPopup(); });
            layer.on('mouseout', function () { layer.closePopup(); });
        }
 
        function selectProperties(data) {
            if (selectedLayer) {
                map.removeLayer(selectedLayer);
                $("#selectedParcelIds").empty();
            }
            selectedLayer = L.geoJson(JSON.parse(data), {
                onEachFeature: onEachFeature,
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 5,
                        fillColor: "#22F8E8",
                        color: "#000",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                }

            }).addTo(map);
            var selectedIds = [333435, 333450, 334847, 358085, 359182];
            selectedIds = _.map((JSON.parse(data)).features, function (idx) {
                return idx.properties.parcelNumb;
            });
            var selectedIdsHtml = '';
            $.each(selectedIds, function (index, val) {
                selectedIdsHtml += '<li>' + val + '</li>';
            });
            $('#selectedParcelIds').append(selectedIdsHtml)
        }
    });
});