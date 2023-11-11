import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class LoginsServiceService {

  logado = new EventEmitter<boolean>();

  logadoService: boolean |any;

  constructor(private http: HttpClient, private router: Router) { }

   login(credentials: any){

    return this.http.post("http://localhost:5130/api/Login/login", credentials)
    .subscribe(response => {
      const token = (<any>response).token;
      console.log("Token =", token)             
       this.logado.emit(true);
      console.log("LOGADO TRUE SERVICE = ", this.logado)   
      localStorage.setItem("jwt", token);      
      this.router.navigate(['/','home']);
     }, error =>   
     this.logado.emit(false)       
     );

  }

   usuarioautenticado(){  
    return this.logado    
    
   }



  
}
