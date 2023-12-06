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

  logadoService: boolean |any;

  constructor(private http: HttpClient, private router: Router, private baseUrl: BaseUrlComponent) { }

   login(credentials: any){

    return this.http.post( this.baseUrl.BaseUrlLogin, credentials)
    .subscribe({
      next: (data)=> { const token = (<any>data).token;
         this.logado.emit(true);
         console.log("Token =", token);
         console.log("LOGADO TRUE SERVICE = ", this.logado);
         localStorage.setItem("jwt", token); 
         this.router.navigate(['/','home']);
        
        },      
      error: ()=> this.logado.emit(false), 
      complete: () => console.info('complete') ,

    })    
  }

   usuarioautenticado(){  
    return this.logado    
    
   }



  
}
