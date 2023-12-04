import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesUsuario {

  constructor(private http: HttpClient) { }

    addUser(user: any):Observable<any>{

      console.log("Usuario =", user)
      return this.http.post('https://localhost:7131/api/User', user)
    }


    getUser():Observable<any>{

      return this.http.get('https://localhost:7130/api/User')
      
    }


}





