import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { resolve } from 'q';
import { Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-map-api',
  templateUrl: './map-api.component.html',
  styleUrls: ['./map-api.component.css']
})
export class MapApiComponent implements OnChanges{
  
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  latitude:number;
  longitude:number;
  defLat: number = 19.3977705;
  defLog: number = -99.1735841;
  geocoder: google.maps.Geocoder;  //To find addresses
  infoWindow: google.maps.InfoWindow; //To find by device location
  address: string = ""
  pos: any

  @Input() dynamicAddress: string;
  @Input() findMe: boolean;

  @Output() positionToReturn: EventEmitter<any> = new EventEmitter<any>();

  changeEmitter(){
    this.positionToReturn.emit("hola")
  }

  ngOnChanges(){
    if(this.dynamicAddress){
      this.address = this.dynamicAddress
      this.geocodeAddress()
    } else if(this.findMe){
      this.getPosition()
    }
  }
  
  //Configures map
  ngAfterContentInit(){
    var mapProp = {
      center: new google.maps.LatLng(this.defLat, this.defLog),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
  
  //Draws map
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

  // Find user's position. Stores it in 
  getPosition() {
    this.infoWindow = new google.maps.InfoWindow;
    this.pos = {}
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    .then((pos:any) => {
      this.pos = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
      this.infoWindow.setPosition(this.pos);
      this.infoWindow.setContent('Location found');
      this.infoWindow.open(this.map);
      this.map.setCenter(this.pos);

      //Return the user position to the parent component
      this.positionToReturn.emit(this.pos)
    })
    .catch((err) => {
      console.error(err.message);
      this.infoWindow.setContent('Location cannot found');
    });
  }

  // Find based on an address
  geocodeAddress() {
    this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode({'address': this.address}, (results, status)=>{
     // if (status === 'OK') {
        this.map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        })
      // } else {
      //   alert('Geocode was not successful for the following reason: ' + status);
      // }
    });
  }

}
