import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotFoundError, Observable, catchError, map, take, throwError } from 'rxjs';
import { BaseUrlComponent } from 'src/app/Shared/base-url/base-url.component';




@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient, private baseUrl: BaseUrlComponent ) { }

  
getRoles(){
  // var reqHeader = new HttpHeaders({
  //   'Content-Type': 'aplication/json',
  //   "Authorization": 'Bearer '+ this.baseUrl.token
  // });

  return this.http.get<any>(this.baseUrl.BaseUrlRoles)
  

}

addRoles(role: any):Observable<any>{

  var reqHeader = new HttpHeaders({
    'Content-Type': 'aplication/json',
    'Authorization': 'Bearer '+ this.baseUrl.token
  });

    return this.http.post(this.baseUrl.BaseUrlRoles,role)

}


deleteRoles(id: any):Observable<any>{  
   
  return this.http.delete(this.baseUrl.BaseUrlRoles + "/" + id)
  

}

}
