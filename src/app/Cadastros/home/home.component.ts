import { Component, OnInit, ViewChild } from '@angular/core';
import { AgmInfoWindow, AgmMarker, MouseEvent } from '@agm/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { HungerServiceService } from '../hunger-map/hunger-service.service';
import { BaseUrlComponent } from 'src/app/Shared/base-url/base-url.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  [x: string]: any;

  constructor(private hungerService: HungerServiceService, private baseUrl: BaseUrlComponent ) { } 

  ngOnInit(): void {
    this.geoLocalize();
    this.getListhungerMap();    
    this.getCustomer();
   
    
  }

  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective | undefined;

  lat: number | any;
  lng: number | any
  zoom: number = 18;
  roleAdmin: boolean | any;
  roleAnjo: boolean | any;
  roleCarente: boolean | any;
  markers: marker[] | any = [];
  anjomarkers: marker[] | any = [];
  infor: info[] | any = [];
  inf: any;
  singleInfoWindow: AgmInfoWindow | any
  agmMarker: AgmMarker | any;
  indiceinfo: boolean = false;
  previous: any;
  List_addressHunger: HungerUserAddress | any;
  List_anjo: HungerUserAddress | any;
  assestEnd: string | any; 
  assestAnjo: string | any;

 
 
  getCustomer() {
    if (localStorage.getItem('role') == "Admin") {
      this.roleAdmin = true;
    } else {
      this.roleAdmin = false;
    }
    if (localStorage.getItem('role') == "Carente") {
      this.roleCarente = true;
    } else {
      this.roleCarente = false;
    }
    if (localStorage.getItem('role') == "Anjo") {
      this.roleAnjo = true;
    } else {
      this.roleAnjo = false;
    }
  }

  getListhungerMap() {
    this.hungerService.getListHungerMapuserAddress()
      .subscribe({
        next: (data) => {
          this.List_addressHunger = data, 
          this.List_addressHunger.forEach((element: any) => {
            if(element.role == "Carente"){
              console.log("Entrou em Carente")              
            }                 
            
           });
           this.listaMarkers(),  
                        
           
            console.log("Listahunger = ", this.List_addressHunger)
            
        },
        error: (e) => { console.log("ERROR =", e) },
        complete: () => console.info('complete'),
      })
  }

  
  getListAnjo() {
    this.hungerService.getListAnjo()
      .subscribe({
        next: (data) => {
          this.List_anjo = data, this.roleAnjo = true, 
            console.log("ListAnjo = ", this.List_anjo),
            this.listaMarkersAnjo();
        },
        error: (e) => { console.log("ERROR =", e) },
        complete: () => console.info('complete'),
      })
  }
  listaMarkers() {
    console.log("List_addressHunger =",this.List_addressHunger)
    for (var i = 0; i < this.List_addressHunger.length; i++) {
        if(this.List_addressHunger[i].role == "Carente"){
          this.markers.push({
            lat: this.List_addressHunger[i].lat,
            lng: this.List_addressHunger[i].lng,          
            label: "", 
            animation: "'DROP'",                          
            draggable: true,
            iconUrl: './assets/imageAGM/carenteMap.png'          
          }) 
        }
        if(this.List_addressHunger[i].role == "Anjo" && this.List_addressHunger[i].email == localStorage.getItem("email")){
          this.markers.push({
            lat: this.List_addressHunger[i].lat,
            lng: this.List_addressHunger[i].lng,          
            label: "",  
            animation: "BOUNCE",      
            draggable: true,
            iconUrl: './assets/imageAGM/anjoMap.png'            
          }) 

        }


        

        this.infor.push({
          info:
            this.List_addressHunger[i].rua + "," + this.List_addressHunger[i].numero + "," +
            this.List_addressHunger[i].bairro + "," +
            this.List_addressHunger[i].cidade
            + ", Pessoas :" + this.List_addressHunger[i].totalPessoas
            + ", Homens :" + this.List_addressHunger[i].masculino
            + ", Mulheres :" + this.List_addressHunger[i].feminino
            + ", Maior de 60 anos :" + this.List_addressHunger[i].maior60
            + ", Menor de 10 anos :" + this.List_addressHunger[i].menor10,
          position: i + 1
        })
      
      
    }
  }

  listaMarkersAnjo() {
    for (var i = 0; i < this.List_anjo.length; i++) {

        this.anjomarkers.push({
          lat: this.List_anjo[i].lat,
          lng: this.List_anjo[i].lng,
          label: "",
          draggable: true
        })
        this.infor.push({
          info:
            this.List_anjo[i].rua + "," + this.List_anjo[i].numero + "," +
            this.List_anjo[i].bairro + "," +
            this.List_anjo[i].cidade
            + ", Pessoas :" + this.List_anjo[i].totalPessoas
            + ", Homens :" + this.List_anjo[i].masculino
            + ", Mulheres :" + this.List_anjo[i].feminino
            + ", Maior de 60 anos :" + this.List_anjo[i].maior60
            + ", Menor de 10 anos :" + this.List_anjo[i].menor10,
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



  infoAddress(index: number,) {
    for (var i = 0; i <= this.infor.length; i++) {     
      if (index == this.infor[i].position) {
        this.inf = this.infor[i].info
        this.indiceinfo = true;
        return this.inf
      }
    }
  }

  clickedMarker(index: number, infowindow: any) {

    if (this.previous) {
      console.log("Entrou pra fechar")
      this.previous.close();
      for (var i = 0; i <= this.infor.length; i++) {
        if (index == this.infor[i].position) {
          this.inf = this.infor[i].info
          this.indiceinfo = true;
          this.previous = infowindow;
          return this.inf
        }
      }
    } else {
      for (var i = 0; i <= this.infor.length; i++) {
        if (index == this.infor[i].position) {
          this.inf = this.infor[i].info
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
  iconUrl: string;
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
  info: string;
  Endereco: string;
  position: number;

}
