import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

interface IMarker {
  lat: number;
  lng: number;
  class?: string;
  description: string;
}

@Component({
  selector: 'bishub-energy-leaflet-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss',
})
export class LeafletMapComponent implements OnInit {
  // list of markers
  @Input() markers: IMarker[] | undefined;

  map!: L.Map;

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([50.0874654, 14.4212535], 13);

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }
    );

    tiles.addTo(this.map);
  }
}
