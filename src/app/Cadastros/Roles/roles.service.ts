import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }


getRoles(){

  return this.http.get<any>('https://localhost:7001/api/Roles');

}

addRoles(role: any):Observable<any>{

  console.log("Usuario =", role)
  return this.http.post<any>('https://localhost:7001/api/Roles/Cadastro', role)
  
}



}
