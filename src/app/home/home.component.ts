import { Component, OnInit } from '@angular/core';
import { LoginsServiceService } from '../logins-service.service';
import { Services } from '../Services/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //isInvalidLogin: Boolean = false;

  lista:  any;

constructor(private customer: Services, private login: LoginsServiceService){}
mostrarMenu: Boolean = false;

//  ngOnInit(){

//   this.login.invalidloginEmitter.subscribe(
//     isinvalid => this.isInvalidLogin = isinvalid
//   );

//   console.log("LoginValido=", this.isInvalidLogin)

//  }

ngOnInit(){

    this.isUserAuthenticated();

  this.customer.getCustomer()
    .subscribe(response=>{
      this.lista = response;
    }, err=> {
      console.log(err)

    } )
    
  console.log("LISTA=",this.lista)

  this.login.logado.subscribe(
    mostrar => this.mostrarMenu = mostrar

  );

 
}
  
isUserAuthenticated(){  
    const token:  any =  localStorage.getItem("jwt");   
    if(token){
      return true;
    }else{
      return false;
    }  
 }

 isauth: boolean = this.isUserAuthenticated();


 logOut(){
  localStorage.removeItem("jwt");
  this.reloadPage();
 }


 reloadPage(){
  window.location.reload()
}
 

}
