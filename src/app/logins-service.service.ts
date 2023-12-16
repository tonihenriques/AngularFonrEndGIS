import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { BaseUrlComponent } from './Shared/base-url/base-url.component';


@Injectable({
  providedIn: 'root'
})
export class LoginsServiceService {

  logado = new EventEmitter<boolean>();
  roleName = new EventEmitter<string>();

  logadoService: boolean |any;

  constructor(private http: HttpClient, private router: Router, private baseUrl: BaseUrlComponent) { }

   login(credentials: any){
    console.log("Credential =", credentials)

    return this.http.post( this.baseUrl.BaseUrlLogin, credentials)
    
  }

   usuarioautenticado(v: boolean){  
    return this.logado.emit(v);  
    
   }
   autenticado(){  
    return this.logado;  
    
   }

   nomeDaAutorizacao(s: string){
    return this.roleName.emit(s)
   }

   escutaAutorizacao(){
    return this.roleName
   }

   



  
}
