import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmInfoWindow, AgmMarker, MouseEvent } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { HungerServiceService } from '../hunger-map/hunger-service.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;

  constructor(private hungerService: HungerServiceService) { }



  List_addressHunger: HungerUserAddress | any;

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

  agmMarker: AgmMarker | any;

  indiceinfo: boolean = false;

  previous: any;


  getCustomer() {
    if (localStorage.getItem('role') == "Admin") {

      this.roleAdmin = true;

    } else {
      this.roleAdmin = false;
    }
  }


  getListhungerMap() {

    this.hungerService.getListHungerMapuserAddress()
      .subscribe({
        next: (data) => {
          this.List_addressHunger = data,
            console.log("Listahunger = ", this.List_addressHunger),
            this.listaMarkers();
        },
        error: (e) => { console.log("ERROR =", e) },
        complete: () => console.info('complete'),
      })
  }

  listaMarkers() {

    for (var i = 0; i < this.List_addressHunger.length; i++) {

      this.markers.push({
        lat: this.List_addressHunger[i].lat,
        lng: this.List_addressHunger[i].lng,
        label: "",
        endereco: this.List_addressHunger[i].rua + "," + this.List_addressHunger[i].numero + "," + this.List_addressHunger[i].bairro + "," + this.List_addressHunger[i].cidade + "," +
                  this.List_addressHunger[i].totalPessoas,
        draggable: true,

      })

      this.info.push({
        info: this.List_addressHunger[i].rua + "," + this.List_addressHunger[i].numero + "," + this.List_addressHunger[i].bairro + "," + this.List_addressHunger[i].cidade +",Pessoas:"+ 
        this.List_addressHunger[i].totalPessoas,
        position: i + 1
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

      this.markers.push({
        lat: this.lat,
        lng: this.lng,
        draggable: false,
        animation: 'DROP',

      })

    })

  }


  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective | undefined;

  infoAddress(index: number,) {
    for (var i = 0; i <= this.info.length; i++) {

      console.log("Preview no for", this.previous)


      if (index == this.info[i].position) {

        this.inf = this.info[i].info

        this.indiceinfo = true;

        return this.inf
      }

    }

  }





clickedMarker( index: number, infowindow: any) { 
 
  if (this.previous) {   
    console.log("Entrou pra fechar")
    this.previous.close();

    for (var i = 0; i <= this.info.length; i++) {   

      if (index == this.info[i].position) {
  
        this.inf = this.info[i].info
  
        this.indiceinfo = true;
        this.previous = infowindow;
  
        return this.inf
      }
  
    }
  }else{
    for (var i = 0; i <= this.info.length; i++) {   

      if (index == this.info[i].position) {       
  
        this.inf = this.info[i].info
  
        this.indiceinfo = true;
        this.previous = infowindow;
  
        return this.inf
      }
  
    }
  
    

  }

  

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
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  lat: string;
  lng: string;


}


interface HungerUserAddress {

  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  lat: string;
  lng: string;  
  email: string;
  username: string;
  phoneNumber: string;
  totalPessoas: string;
  menor10: string;
  maior60: string;
  feminino: string;
  masculino: string;


}

interface info {

  inf: string;
  position: any;

}
