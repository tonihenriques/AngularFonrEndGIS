import { Component, ViewChild } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { HungerServiceService } from './hunger-service.service';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ModalService } from 'src/app/Shared/modal-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ServicesUsuario } from '../services-usuario.service';



@Component({
  selector: 'app-hunger-map',
  templateUrl: './hunger-map.component.html',
  styleUrls: ['./hunger-map.component.css']
})
export class HungerMapComponent {

  constructor(private hungerService: HungerServiceService, private SmodalService: ModalService, private modalService: BsModalService,
    private router: Router, private serviceuser: ServicesUsuario, private hungerUser: HungerServiceService ){

  }

  markers: marker[] | any = []
  List_addressHunger: addressH | any;
  modalRef?: BsModalRef;
  @ViewChild('confimCadastro') confimCadastro: any;
  dadosUser: any
  emailRegistrado: boolean  = false;

  locEmail: any = localStorage.getItem("email")?.toString();

  
 addressH =  {
  'rua': "",
  'numero':"",
  'bairro':"",
  'cidade':"",
  'estado':"",
  'pais': "",
  'cep':"",
  'lat': "",
  'lng': "",   
  'email': "",
}
 
  
  options: Options = new Options({
    types: ['address'],
    //componentRestrictions: { country: 'BR' }
  })



  public handleAddressChange(address: Address) {
    console.log("ADDRESS = ",address)
    console.log("Endereço = ", address.formatted_address)
    console.log("Latitude = ", address.geometry.location.lat())
    console.log("Longitude", address.geometry.location.lng())
    console.log("Makers =", this.markers)
    console.log("Componentes =", address.address_components)

    this.fillAddress(address)


  }

  fillAddress(address: Address){
  
    let lat;
    let lng;

    lat = address.geometry.location.lat();
    lng = address.geometry.location.lng()


    console.log("Endereços = ", address)

    for (const component of address.address_components as google.maps.GeocoderAddressComponent[]) {
      const componentType = component.types[0];

      switch (componentType) {

        case "street_number": {
          this.addressH.numero  = `${component.long_name}`;
          break;
        }
  
        case "route": {
          this.addressH.rua = component.long_name;
          break;
        }
  
        case "sublocality_level_1": {
          this.addressH.bairro = component.long_name;
          break;
        }  
        case "administrative_area_level_2": {
          this.addressH.cidade = component.long_name;
          break;
        }  
        case "administrative_area_level_1": {
          this.addressH.estado = component.long_name;
          break;
        }  
        case "country": {
          this.addressH.pais = component.long_name;
          break;
        }  
        case "postal_code": {
          this.addressH.cep = component.long_name;
          break;
        }  
      
      }      

    }    

    

    this.addressH.lat =  address.geometry.location.lat().toString();
    this.addressH.lng =  address.geometry.location.lng().toString();
    this.addressH.email = this.locEmail;

    console.log("Email = ", this.addressH.email)

    
    this.confirmCadastro();
   
    

  }

  confirmCadastro(){   
    this.modalRef = this.modalService.show(this.confimCadastro, {class: 'modal-sm'});
    console.log("entrou bonito!")
  }

  
  openModalService(){

    this.SmodalService.openAlertModal("Succsses", "Cadastro Confirmado!");
  };



  public getListhungerMap(){

    this.hungerService.getListHungerMap()
    .subscribe({
      next: (data)=>{ this.List_addressHunger = data,
      console.log("Listahunger = ", this.List_addressHunger)
      },
      error: (e) => {  },
      complete: () => console.info('complete'),
    })
  }

  addAddres(a: addressH){
    console.log("Entrou em add =", a)
    this.hungerService.addHungerUser(a)
    .subscribe({
      next: (data)=>{ console.log("Cadastro realizado", data),
      console.log("Cadatro Realizado = ")
      },
      error: (e) => { console.log("ERROR =", e) },
      complete: () => console.info('complete'),
    })
  }

  getUser(){
    this.hungerUser.getListHungerMap()
      .subscribe({
        next:(data)=>{this.dadosUser = data,console.log("Dados =", this.dadosUser),
                  
          this.dadosUser.forEach((element: any) => {
            if(element != null && element.email == this.locEmail )
            {
              console.log("EmaiRegistrado 1",this.emailRegistrado )
              this.emailRegistrado = true;
            }
            if(this.emailRegistrado ==true)
            {
              alert("Usuario já está cadastrado no sistema!")
            }
                    
          });

          this.emailRegistrado == false?this.addAddres(this.addressH): null

        },        
        error: (e)=> {console.log("Error", e)}
      })
  }
 

  confirm(): void {

    this.getUser();

   
    this.modalRef?.hide();

    this.router.navigate(['/', 'home']);

  }
 
  decline(): void {
    
    this.modalRef?.hide();

    this.modalRef?.hide();

  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
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
