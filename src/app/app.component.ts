import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginsServiceService } from './logins-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Utils } from './Entidades/Utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GIS';

  mostrarMenu: boolean |any;

 constructor(private router: Router, private login: LoginsServiceService, private jwtHelper: JwtHelperService){}

 ngOnInit(){
  
  //this.reloadPage();
  this.isUserAuthenticated();

 this.login.usuarioautenticado()
  .subscribe(    
    logado => this.mostrarMenu = logado
    
  ) 

 }

 isUserAuthenticated(){  
  const token:  any =  localStorage.getItem("jwt");   
   if(token && !this.jwtHelper.isTokenExpired(token)){
    console.log("Expirado =", this.jwtHelper.isTokenExpired(token))
    return true;
  }else{
    return false;
  }  
 }

 logOut(){
  localStorage.removeItem("jwt");
  this.mostrarMenu = false;  
  this.reloadPage();
 
 }

 isauth: boolean = this.isUserAuthenticated();

 reloadPage(){
  window.location.reload()
}
 
}
