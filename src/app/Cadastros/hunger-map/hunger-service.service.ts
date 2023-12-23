import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlComponent } from 'src/app/Shared/base-url/base-url.component';

@Injectable({
  providedIn: 'root'
})
export class HungerServiceService {

  constructor(private http: HttpClient, private baseUrl: BaseUrlComponent) { }


  getListHungerMap() {    

    return this.http.get(this.baseUrl.BaserUrlHunger,this.baseUrl.httpOptions)
  }
  
  getListHungerMapuserAddress() {    

    return this.http.get(this.baseUrl.BaseurlHungerUserAddress,this.baseUrl.httpOptions)
  }

  
  getListAnjo() {    

    return this.http.get(this.baseUrl.BaseurListAnjo + localStorage.getItem("email") ,this.baseUrl.httpOptions)
  }


  addHungerUser(addressH: any) { 

    console.log("Entrou em addService ", addressH)

    return this.http.post(this.baseUrl.BaserUrlHunger, addressH,this.baseUrl.httpOptions)

  }

}
