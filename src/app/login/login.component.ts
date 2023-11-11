import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginsServiceService } from '../logins-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent  {  
 
  isInvalidLogin: Boolean | any;

  constructor( private http: HttpClient, private router: Router, private login: LoginsServiceService){

  }



  onSubmit(form: NgForm){

   console.log("Nome = ", form.value.nome)
    console.log("Form = ", form.value)

    const credentials ={
      'username': form.value.nome,
      'password': form.value.password,
      'role': 'Amin',
      "phoneNumber": ""

    }

      this.login.login(credentials);

      this.login.logado.subscribe(
        valid => this.isInvalidLogin = valid
      )          
   }    
      

   reloadPage(){
    window.location.reload()
  }

  }


