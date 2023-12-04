import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotFoundError, Observable, catchError, map, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient ) { }

  
getRoles(){

  return this.http.get<any>('https://localhost:7130/api/Roles');

}

addRoles(role: any):Observable<any>{
   
    return this.http.post<any>('https://localhost:7130/api/Roles/Cadastro', role)  
    
  
}



}
