import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Services {

  constructor(private http: HttpClient) { }

  getCustomer(){
    return this.http.get<string>("http://localhost:7130/api/Customers");  

  }
}
