import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { HungerServiceService } from '../hunger-map/hunger-service.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  

  constructor(private hungerService: HungerServiceService ){}



  List_addressHunger: addressH | any;
 
  ngOnInit(): void {

    this.geoLocalize();
    this.getListhungerMap();    

  }

  lat: number | any;
  lng: number | any
  zoom: number = 18;  

  
  getListhungerMap(){

    this.hungerService.getListHungerMap()
    .subscribe({
      next: (data)=>{ this.List_addressHunger = data,
      console.log("Listahunger = ", this.List_addressHunger),
      this.listaMarkers();
      },
      error: (e) => {console.log("ERROR =",e)  },
      complete: () => console.info('complete'),
    })
  }

  listaMarkers(){

    this.List_addressHunger.forEach((element: any) => {

      if(element != null){

        this.markers.push(  {
          lat: element.lat,
          lng:  element.lng,
          label: '*',          
          draggable: true
        })       
        
      }
      
    });
   
  }

  geoLocalize() {

    navigator.geolocation.getCurrentPosition(position => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      this.lat = pos.lat,
        this.lng = pos.lng

        this.markers.push(  {
          lat: this.lat,
          lng:  this.lng,                  
          draggable: false,
          animation: 'DROP',
          
        })      

    })

  }


  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective | undefined;

 
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  
  markerOver(m: marker) {
    m.animation = 'BOUNCE';
  }
  
  markerOut(m: marker) {
    m.animation = '';
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,    
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] | any = []

}


// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  animation: 'DROP' | 'BOUNCE' | '';
}


interface addressH {

  rua: string;
  numero:string;
  bairro:string;
  cidade:string;
  estado:string;
  pais: string;
  cep:string;
  lat: string;
  lng: string;
 
  
}
