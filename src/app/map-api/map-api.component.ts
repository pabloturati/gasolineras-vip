import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {  } from '@types/googlemaps';
import { resolve } from 'q';


@Component({
  selector: 'app-map-api',
  templateUrl: './map-api.component.html',
  styleUrls: ['./map-api.component.css']
})
export class MapApiComponent {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  latitude:number;
  longitude:number;
  defLat: number = 19.3977705;
  defLog: number = -99.1735841;
  geocoder: google.maps.Geocoder;  //To find addresses
  infoWindow: google.maps.InfoWindow; //To find by device location
  address: string = ""
  pos: object
  
  ngAfterContentInit(){
    var mapProp = {
      center: new google.maps.LatLng(this.defLat, this.defLog),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
  
  setCenter(e:any){
    e.preventDefault();
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
    
    let location = new google.maps.LatLng(this.latitude, this.longitude);

    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'Got you!'
    });

    marker.addListener('click', () => {
      this.markerHandler(marker);
    });
  }
  markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }


  getPosition() {
    this.infoWindow = new google.maps.InfoWindow;
    this.pos = {}
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    .then((position) => {
      this.pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.infoWindow.setPosition(this.pos);
      this.infoWindow.setContent('Location found');
      this.infoWindow.open(this.map);
      this.map.setCenter(this.pos);
    })
    .catch((err) => {
      console.error(err.message);
      this.infoWindow.setContent('Location cannot found');
    });
  }

  findAddress(value){
    this.address = value;
    this.geocodeAddress()
  }

  geocodeAddress() {
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({'address': this.address}, (results, status)=>{
      if (status == 'OK') {
        this.map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        })
        // console.log(results[0])  //Json with lat and lon
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
