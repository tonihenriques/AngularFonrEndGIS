import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseUrlComponent } from 'src/app/Shared/base-url/base-url.component';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  constructor(private http: HttpClient, private baseUrl: BaseUrlComponent) { }



  getAlimentos() {    

    return this.http.get(this.baseUrl.BaseurlAlimentos,this.baseUrl.httpOptions)
  }

  
  addAlimentos(alimento: any) { 

    console.log("Entrou em alimento ", alimento)

    return this.http.post(this.baseUrl.BaseurlAlimentos, alimento)

  }
  

  deleteAlimentos(id: any) { 

    console.log("Entrou em alimento ", id)

    return this.http.delete(this.baseUrl.BaseurlAlimentos + "/" + id)

  }
  

}
