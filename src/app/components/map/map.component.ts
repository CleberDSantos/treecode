import { Component, NgModule, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { TreelocationService } from '../../services/treelocation.service';

declare var google: any;
declare var jQuery: any;
declare var $: any;
declare var Highcharts: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  providers: [TreelocationService]
})

export class MapComponent implements OnInit {

  map: L.Map;
  options: any;
  center: L.LatLng;
  zoom: number;
  geoJSONLayer: L.GeoJSON;
  overlayLayers: L.Layer[] = [];
  drawOptions: any;
  layersControl: any;
  private locationService: TreelocationService
  private SH_BASE_WMS_URL: string = 'services.sentinel-hub.com';
  private SH_INSTANCE_ID: string = '813ab432-d728-bb7b-f7da-ecbffdb6509f';
  private SH_WMS_CONFIG: any = {};

  constructor(locationService: TreelocationService) {
    this.locationService = locationService;
  }

  private setupNasaMoistureWmsMap(): any {

    this.SH_WMS_CONFIG.layers = 'MOISTURE_INDEX';
    this.SH_WMS_CONFIG.atmFilter = '';
    this.SH_WMS_CONFIG.gain = '1';
    this.SH_WMS_CONFIG.gamma = '1';
    this.SH_WMS_CONFIG.styles = '';
    this.SH_WMS_CONFIG.format = 'image/jpeg';
    this.SH_WMS_CONFIG.transparent = 'false';
    this.SH_WMS_CONFIG.version = '1.3.0';
    this.SH_WMS_CONFIG.tileSize = 512;

    const baseUrl = 'http://' + this.SH_BASE_WMS_URL + '/v1/wms/' + this.SH_INSTANCE_ID + '?showLogo=false';
    const sentinelHub = L.tileLayer.wms(baseUrl, {
      attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
      version: this.SH_WMS_CONFIG.version,
      layers: this.SH_WMS_CONFIG.layers,
      styles: this.SH_WMS_CONFIG.styles,
      format: this.SH_WMS_CONFIG.format,
      transparent: this.SH_WMS_CONFIG.transparent,
      tileSize: this.SH_WMS_CONFIG.tileSize,
      preview: '3',
      atmFilter: this.SH_WMS_CONFIG.atmFilter,
      gain: this.SH_WMS_CONFIG.gain,
      gamma: this.SH_WMS_CONFIG.gamma,
    });

    return sentinelHub;

  }

  private setupNasaAgricultureWmsMap(): any {

    this.SH_WMS_CONFIG.layers = 'AGRICULTURE';
    this.SH_WMS_CONFIG.atmFilter = 'ATMCOR';
    this.SH_WMS_CONFIG.gain = '1';
    this.SH_WMS_CONFIG.gamma = '1';
    this.SH_WMS_CONFIG.styles = '';
    this.SH_WMS_CONFIG.format = 'image/jpeg';
    this.SH_WMS_CONFIG.transparent = 'false';
    this.SH_WMS_CONFIG.version = '1.3.0';
    this.SH_WMS_CONFIG.tileSize = 512;

    const baseUrl = 'http://' + this.SH_BASE_WMS_URL + '/v1/wms/' + this.SH_INSTANCE_ID + '?showLogo=false';
    const sentinelHub = L.tileLayer.wms(baseUrl, {
      attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
      version: this.SH_WMS_CONFIG.version,
      layers: this.SH_WMS_CONFIG.layers,
      styles: this.SH_WMS_CONFIG.styles,
      format: this.SH_WMS_CONFIG.format,
      transparent: this.SH_WMS_CONFIG.transparent,
      tileSize: this.SH_WMS_CONFIG.tileSize,
      preview: '3',
      atmFilter: this.SH_WMS_CONFIG.atmFilter,
      gain: this.SH_WMS_CONFIG.gain,
      gamma: this.SH_WMS_CONFIG.gamma,
    });

    return sentinelHub;

  }


  public ngOnInit(): void {

    this.center = L.latLng(-23.433315, -51.933939);
    this.zoom = 14;
    this.options = {
      layers: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    };

    const greenIcon = new L.Icon({
      iconUrl: 'http://www.freeiconspng.com/uploads/small-tree-icon-8.png',
      iconSize: new L.Point(50, 50)
    });

    this.drawOptions = {
      position: 'topleft',
      draw: {
        polygon: false,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: {
          icon: greenIcon
        },
      }
    };


  }

  private drawTreeLocations() {
    this.locationService.get().subscribe((locations) => {

      locations.forEach(location => {
        debugger


        const icon = L.icon({
          iconUrl: 'http://www.freeiconspng.com/uploads/small-tree-icon-8.png',
          iconSize: [50, 50]
        });

        const position = L.latLng(location.lat, location.ltn);
        const marker = L.marker(position, { icon: icon });

        const carbono = L.circle(position, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.2,
          radius: 200
        });

        const oxig = L.circle(position, {
          color: 'blue',
          fillColor: '#f03',
          fillOpacity: 0.0,
          radius: 400
        });

        this.map.addLayer(carbono);
        this.map.addLayer(oxig);

        marker.bindPopup(`<!-- Nav tabs -->
                    <ul id="myTab"  class="nav nav-tabs" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#temp" role="tab">Temperatura</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#umidade" role="tab">Umidade</a>
                      </li>
                       <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#diametro" role="tab">Diâmetro</a>
                      </li>
                       <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#street" role="tab">Street Map</a>
                      </li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                      <div class="tab-pane active" id="temp" role="tabpanel">...</div>
                      <div class="tab-pane" id="umidade" role="tabpanel">.qweqwewe..</div>
                      <div class="tab-pane" id="diametro" role="tabpanel">..jghjghjghj.</div>
                      <div class="tab-pane" id="street" role="tabpanel">
                      <div style=" width: 100%; height: 350px;" class="panorama"></div></div>
                 
                    </div>`, { minWidth: 600 });

        marker.addTo(this.map);

        marker.on("click", (e: any) => {
          var sv = new google.maps.StreetViewService();
          var myLatLng = new google.maps.LatLng(e.latlng.lat, e.latlng.lng);
          sv.getPanorama({ location: myLatLng, radius: 50 }, processSVData);

          function processSVData(data, status) {

            if (status === google.maps.StreetViewStatus.OK) {
              var panorama;
              panorama = new google.maps.StreetViewPanorama(document.querySelector(".panorama"));
              panorama.setPosition(data.location.latLng);
              panorama.setPov(({
                heading: 265,
                pitch: 0
              }));
              panorama.setEnableCloseButton(false);
              panorama.setVisible(true);
            } else {
              console.error('Street View data not found for this location.');
            }
          }


          Highcharts.chart('temp', {

            title: {
              text: false
            },

            yAxis: {
              title: {
                text: 'Elementos'
              }
            },

             xAxis: {
              title:false
            },

            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
            },

            plotOptions: {
              series: {
                pointStart: 2013
              }
            },

            series: [{
              name: 'Temperatura',
              data: [15, 20, 20, 25, 23, 23, 28, 20]
            }]

          });


          Highcharts.chart('umidade', {

            title: {
              text: false
            },

            yAxis: {
              title: {
                text: 'Elementos'
              }
            },

             xAxis: {
              title:false
            },

            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
            },

            plotOptions: {
              series: {
                pointStart: 2013
              }
            },

            series: [{
              name: 'Umidade',
              data: [1, 3, 2, 1, 1, 1, 2, 3]
            }]

          });

           Highcharts.chart('diametro', {

            title: {
              text: false
            },

            yAxis: {
              title: {
                text: 'Elementos'
              }
            },

             xAxis: {
              title:false
            },

            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
            },

            plotOptions: {
              series: {
                pointStart: 2013
              }
            },

            series: [{
              name: 'Diametro',
              data: [12, 33,35, 39,45, 49, 52, 66]
            }]

          });

        });



      });

    });
  }

  onMapReady(map: L.Map) {

    this.map = map;

    this.setupDrawEvent();
    this.setupMapControl();
    this.drawTreeLocations();
  }


  private setupMapControl() {
    const nasaAgriculture = this.setupNasaAgricultureWmsMap();
    const nasaMoisture = this.setupNasaMoistureWmsMap();

    const baseMaps = {
      'OpenStreetMap': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
      'Nasa Mapa de Umidade': nasaMoisture,
      'Nasa Mapa de Agricultura': nasaAgriculture,
    };

    L.control.layers(baseMaps, null).addTo(this.map);

  }

  private setupDrawEvent() {

    this.map.on('draw:created', (e: any) => {

      const type = e.layerType,
        layer = e.layer;

      if (type === 'marker') {

        const carbono = L.circle(layer.getLatLng(), {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.2,
          radius: 500
        });

        const oxig = L.circle(layer.getLatLng(), {
          color: 'blue',
          fillColor: '#f03',
          fillOpacity: 0.0,
          radius: 900
        });

        e.layer.bindPopup(`<!-- Nav tabs -->
                    <ul id="myTab"  class="nav nav-tabs" role="tablist">
                       <li class="nav-item">
                        <a  class="nav-link active" data-toggle="tab" href="#street" role="tab">Street Map</a>
                      </li>
                    </ul>

                    <!-- Tab panes -->
                    <div class="tab-content">
                      
                      <div  class="tab-pane active" id="street" role="tabpanel">
                      <div style=" width: 100%; height: 350px;" class="panorama"></div></div>
                 
                    </div>`, { minWidth: 600 });


          e.layer.on("click", (e: any) => {
          var sv = new google.maps.StreetViewService();
          var myLatLng = new google.maps.LatLng(e.latlng.lat, e.latlng.lng);
          sv.getPanorama({ location: myLatLng, radius: 50 }, processSVData);

          function processSVData(data, status) {

            if (status === google.maps.StreetViewStatus.OK) {
              var panorama;
              panorama = new google.maps.StreetViewPanorama(document.querySelector(".panorama"));
              panorama.setPosition(data.location.latLng);
              panorama.setPov(({
                heading: 265,
                pitch: 0
              }));
              panorama.setEnableCloseButton(false);
              panorama.setVisible(true);
            } else {
              console.error('Street View data not found for this location.');
            }
          }});


           

        e.layer.addTo(this.map);


        this.map.addLayer(carbono);
        this.map.addLayer(oxig);
      }
    });

  }


}
