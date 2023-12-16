import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmInfoWindow, MouseEvent } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { HungerServiceService } from '../hunger-map/hunger-service.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  

  constructor(private hungerService: HungerServiceService){}



  List_addressHunger: addressH | any;
 
  ngOnInit(): void {

    this.geoLocalize();
    this.getListhungerMap();  
    this.getCustomer();  

  }

  lat: number | any;
  lng: number | any
  zoom: number = 18;  
  roleAdmin: boolean | any;
  markers: marker[] | any = [];
  info: info[] | any = [];
  inf: any;
  singleInfoWindow: AgmInfoWindow | any 
 
  indiceinfo: boolean = false;

  getCustomer(){
    if(localStorage.getItem('role')=="Admin"){

    this.roleAdmin = true;

    }else{ 
      this.roleAdmin = false;
    }
  }

  
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

   

      for(var i=0; i < this.List_addressHunger.length; i++){ 

        this.markers.push({
          lat: this.List_addressHunger[i].lat,
          lng:  this.List_addressHunger[i].lng,
          label: "",  
          endereco: this.List_addressHunger[i].rua +","+ this.List_addressHunger[i].numero +","+ this.List_addressHunger[i].bairro +","+ this.List_addressHunger[i].cidade,
          draggable: true,
          
        })    

        this.info.push({
          info: this.List_addressHunger[i].rua +","+ this.List_addressHunger[i].numero +","+ this.List_addressHunger[i].bairro +","+ this.List_addressHunger[i].cidade,
          position: i+1
        })
      }
   
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

 
  clickedMarker(endereco: string, index: number) {
    let contador = 0
  
    

    for(var i=0; i <= this.info.length; i++){

      contador ++;
     
        if(index == this.info[i].position)
        {       
   
         this.inf = this.info[i].info

         this.indiceinfo = true;
        

         return this.inf        
   
        }

    }  

   
   
    console.log("clicked the marker:", endereco,index )
  }

  
  markerOver(m: marker) {
    m.animation = 'BOUNCE';
  }
  
  markerOut(m: marker) {
    m.animation = '';
  }

  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,    
    //   draggable: true
    // });

  //   if (this.singleInfoWindow) {
  //     this.singleInfoWindow.close();
  //  }
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

 
}


// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  endereco: string;
  total: number;
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

interface info {

  inf: string;
  position:any; 
  
}
