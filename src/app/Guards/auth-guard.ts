import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginsServiceService } from '../logins-service.service';
import { JwtHelperService } from '@auth0/angular-jwt'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private login: LoginsServiceService, private router: Router, private jwtHelper: JwtHelperService) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot,
   
  //   ): Observable<boolean> | boolean {     
  //     if(this.login.usuarioautenticado()){
  //       console.log("Entrou em true")
  //       return true;
        
  //     }

  //     console.log("Entrou em false")

  //     this.router.navigate(['/','login']);

  //     return false
   
  // }
  mostrarMenu: Boolean = false;

  authenticado = new EventEmitter<boolean>();

  canActivate(){
    const token = localStorage.getItem("jwt");

    if(token && !this.jwtHelper.isTokenExpired(token)){     
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

}
