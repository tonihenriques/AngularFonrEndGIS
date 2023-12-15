import { Component, EventEmitter, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginsServiceService } from '../logins-service.service';
import { Guid } from 'guid-typescript';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  isInvalidLogin: Boolean | any;
  retornoError: string | any;
  mostrarMenu: boolean | any;
  acessoLoginRoleName: string | any;





  constructor(private http: HttpClient, private router: Router, private login: LoginsServiceService) {

  }

  onSubmit(form: NgForm) {

    console.log("Nome = ", form.value.nome)
    console.log("Form = ", form.value)

    const credentials = {

      'username': form.value.nome,
      'password': form.value.password,
      "role": "string",
      "phoneNumber": "string",
      "roleId": "string",
      "email": "string"


    }

    this.login.login(credentials)     

      .subscribe({
        next: (data) => {
          const token = (<any>data).token;
          this.isInvalidLogin = false;    
          this.login.usuarioautenticado(true);          
          console.log("Token =", token);
          console.log("LOGADO TRUE SERVICE = ", this.isInvalidLogin);
          localStorage.setItem("jwt", token.token);  
          localStorage.setItem("email", token.email) 
          localStorage.setItem("role", token.role)      
          this.acessoLoginRoleName = token.role
          this.login.nomeDaAutorizacao(token.role)
          this.router.navigate(['/', 'home']);

        },
        error: (e) => { this.retornoError = e.error.text, this.isInvalidLogin = true, console.log("RetornoErro = ", this.retornoError) },
        complete: () => console.info('complete'),

      })
  }


  reloadPage() {
    window.location.reload()
  }

}


