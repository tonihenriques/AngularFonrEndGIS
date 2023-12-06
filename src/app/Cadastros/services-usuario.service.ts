import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseUrlComponent } from '../Shared/base-url/base-url.component';

@Injectable({
  providedIn: 'root'
})
export class ServicesUsuario {

  constructor(private http: HttpClient, private baseUrl: BaseUrlComponent) { }

  addUser(user: any): Observable<any> {

    console.log("Usuario =", user)
    return this.http.post(this.baseUrl.BaseUrlUser, user)
  }


  getUsers(): Observable<any> {

    return this.http.get(this.baseUrl.BaseUrlUser)

  }



  deleteUser(id: string){

    return this.http.delete<any>( this.baseUrl.BaseUrlUser + "/" + id)
  }




}





