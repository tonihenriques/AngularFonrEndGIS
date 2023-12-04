import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EMPTY, Observable, catchError, interval, map } from 'rxjs';
import { ServicesUsuario } from '../services-usuario.service';
import { Guid } from 'guid-typescript';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})


export class UsuarioComponent implements OnDestroy  {

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private serviceuser: ServicesUsuario, private router: Router
    ){};   
    
  
  dados: any;
  erroMessage: any;
  user$: Observable<any> | any;
  success$: Observable<any> | any;
  error$: Observable<any> | any;

  source = interval(1000);
 


   formulario = this.formBuilder.group({
    nome: [''],
    password: [''],
    phone: ['']
   })
   
 

  onsubmit(){
    
  const user = {

    "id": Guid,
    "dataInclusao": Date,
    "usuarioExclusao": "string",
    "dataExclusao": Date,
    "username" : this.formulario.get('nome')?.value,
    "password": this.formulario.get('password')?.value,
    "phoneNumber": this.formulario.get('phone')?.value,

  }


    console.log(this.formulario)
    
   
    this.success$ = this.serviceuser.addUser(user)        
    .subscribe({
      next: (data)=> alert("Cadastrado com sucesso!"),  
      //this.user$ = data,      
      error: (e) =>   //this.router.navigate(["alert"]),
      this.error$ =  e,
      complete: () => console.info('complete')      

    }, 
    );   

    this.limpaCampos(); 
    //this.ngOnDestroy();
    
  }

  ngOnDestroy(): void {
   //setTimeout( ()=>{this.success$.unsubscribe()}, 1000);
   //setInterval(this.success$.unsubscribe(),1000)
  }


  getUser(){

    this.serviceuser.getUser()
    .subscribe({
      next: data =>{
        this.dados = data;
      },
      error: error=> {
        this.erroMessage = error.erroMessage;
        console.log('There was an error', this.erroMessage)
      }
    })
  }

  onRefresh(){
    this.router.navigate(["usuario"]);
  }
  
  limpaCampos(){
    this.formulario.setValue({
      nome: '',
      password: '',
      phone: ''
    })
  }


}
 

