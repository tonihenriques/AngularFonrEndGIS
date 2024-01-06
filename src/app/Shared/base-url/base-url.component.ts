import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';




@Component({
  selector: 'app-base-url',
  templateUrl: './base-url.component.html',
  styleUrls: ['./base-url.component.css']
})
export class BaseUrlComponent {

BaseUrlLogin = "https://localhost:5130/api/Login"

BaseUrlRoles = "https://localhost:5130/api/Roles"

BaseUrlUser = "https://localhost:5130/api/User"

BaserUrlHunger = "https://localhost:7234/api/Address"

BaseurlHungerUserAddress = "https://localhost:7234/api/Address/UserAddress"

BaseurListAnjo = "https://localhost:7234/api/Address/UserAnjo/"

BaseurlAlimentos = "https://localhost:7234/api/Alimentos"

token  = localStorage.getItem("jwt");

iconMapCarente = " './assets/imageAGM/carenteMap.png'" 

iconMapAnjo = " './assets/imageAGM/anjoMap.png'" 


httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'Bearer ' + this.token
  })
};


}
