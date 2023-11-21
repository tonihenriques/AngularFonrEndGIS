import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesUsuario } from '../services-usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})


export class UsuarioComponent {

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private serviceuser: ServicesUsuario
    ){};   

   formulario = this.formBuilder.group({
    nome: [''],
    password: [''],
    phone: ['']
   })
   
  ngOnit(){
    
  }

  limpaCampos(){
    this.formulario.setValue({
      nome: '',
      password: '',
      phone: ''
    })
  }

  dados: any;
  erroMessage: any;

  onsubmit(){

    
  const user = {

    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "dataInclusao": "2023-11-14T21:56:57.599Z",
    "usuarioExclusao": "string",
    "dataExclusao": "2023-11-14T21:56:57.599Z",
    "username" : this.formulario.get('nome')?.value,
    "password": this.formulario.get('password')?.value,
    "phoneNumber": this.formulario.get('phone')?.value,

  }


    console.log(this.formulario)
    
    this.serviceuser.addUser(user)    
    .subscribe({
      next: (data)=>   
      console.log(data),      
      error: (e) => console.error(e),
      complete: () => console.info('complete')      

    },
    );

    this.limpaCampos()
   
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


}
 

