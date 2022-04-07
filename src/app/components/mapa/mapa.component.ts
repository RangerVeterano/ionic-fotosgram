import { Component, Input, OnInit, ViewChild } from '@angular/core';

//declaramos la variable del mapa
declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  //recibimos las coordenadas 
  @Input() coords: string

  @ViewChild('mapa', {static:true}) mapa;

  constructor() { }

  ngOnInit() {

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoicmFuZ2VydmV0ZXJhbm8iLCJhIjoiY2t5c2p0cm10MG5mdjJ4czBzbDNtZWhneiJ9.1Yt-M7AVF6qpmGlUsG4S2Q';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 15 // starting zoom
    });

    //Creamos un marcador y lo añadimos al mapa
    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map)
  }

}
