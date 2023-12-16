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
  roleName: string | any;
  roleNameAdmin: boolean | any;

  
 constructor(private router: Router, private login: LoginsServiceService, private jwtHelper: JwtHelperService){}

 ngOnInit(){
  
  //this.reloadPage();
  this.isUserAuthenticated();

 this.login.autenticado()
  .subscribe(    
    logado => {this.mostrarMenu = logado, console.log("logado = ", this.mostrarMenu)}
    
  ) 

  this.login.escutaAutorizacao()
  .subscribe(
    data => {this.roleName = data, 
              console.log("nomeRole =", this.roleName),
              this.roleName === "Admin"? this.roleNameAdmin = true: this.roleNameAdmin = false;
              console.log("roleNameAdmin =", this.roleNameAdmin)
              }
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
  localStorage.removeItem("email");
  localStorage.removeItem("role");
  this.mostrarMenu = false;  
 
 
 }

 isauth: boolean = this.isUserAuthenticated();

 reloadPage(){
  window.location.reload()
}
 
}
