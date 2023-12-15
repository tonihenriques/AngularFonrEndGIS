import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { EMPTY, Observable, catchError, interval, map } from 'rxjs';
import { ServicesUsuario } from '../services-usuario.service';
import { Guid } from 'guid-typescript';
import { Route, Router } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { RolesService } from '../Roles/roles.service';
import { LoginsServiceService } from 'src/app/logins-service.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})


export class UsuarioComponent implements OnDestroy, OnInit {

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient, private serviceuser: ServicesUsuario, private router: Router, private rolservice: RolesService, private login: LoginsServiceService
  ) { }

  ngOnInit(): void {
    this.getRole();
    this.escutaAutorizacao();

  }
  ;

  checkId: any;
  dados: any;
  roleDados: any;
  erroMessage: any;
  user$: Observable<any> | any;
  role$: Observable<any> | any;
  success$: Observable<any> | any;
  error$: Observable<any> | any;
  retorno: string | undefined;
  submitted = false;
  roleNameAdmin: boolean | any;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';


  error: boolean | any;
  success: boolean | any;

  source = interval(1000);

  StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;




  formulario = this.formBuilder.group({
    nome: ['',],
    password: ['', Validators.pattern(this.StrongPasswordRegx)],
    //confirmepassword: [''],
    phone: [''],
    roleId: [''],
    email: ['']
  },


  )



  limpaCampos() {
    this.formulario.setValue({
      nome: '',
      password: null,
      //confirmepassword: null,
      phone: '',
      roleId: '',
      email: ''
    })
  }
  // get passwordFormField() {
  //   return this.formulario.get('password');
  // }


  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  resetPasswordForm() {

    var password = this.formulario.get('password')?.value;
    var newpassword = this.formulario.get('confirmepassword')?.value;

    validator: this.ConfirmedValidator('password', 'newpassword');

  };



  alerts: any[] = [{
    type: 'success',
    msg: `Cadastro realizado com sucesso  em  ${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString()}`,
    timeout: 7000,

  },
  {
    type: 'danger',
    msg: `ERROR: Ocorreu um erro inesperado  em  ${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString()}`,
    timeout: 7000,

  }
  ];


  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }



  get registerFormControl() {
    return this.formulario.controls;
  }


  onsubmit() {

    this.submitted = true;

    const user = {

      "username": this.formulario.get('nome')?.value,
      "password": this.formulario.get('password')?.value,
      "role": "string",
      "phoneNumber": this.formulario.get('phone')?.value,
      "roleId": this.formulario.get('roleId')?.value,
      "email": this.formulario.get('email')?.value

    }


    console.log(this.formulario)

    console.log("CheckId", this.formulario.get('roleId')?.value)
    this.serviceuser.addUser(user)
      .subscribe({
        next: (data) => { this.success$ = data, this.success = true },
        error: (e) => { this.error$ = e, this.error = true },
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


  getUser() {
    this.serviceuser.getUsers()
      .subscribe({
        next: data => {
          this.dados = data;
        },
        error: error => {
          this.erroMessage = error.erroMessage;
          console.log('There was an error', this.erroMessage)
        }
      })
  }



  getRole() {
    this.rolservice.getRoles()
      .subscribe({
        next: data => {
          this.roleDados = data, this.role$ = data, console.log("RoleDados =", this.roleDados)
        },
        error: error => {
          this.erroMessage = error.erroMessage;
          console.log('There was an error', this.erroMessage)
        }
      })
  }



  onRefresh() {
    setTimeout(() => {
      window.location.reload()
    }, 7000);

  }


  escutaAutorizacao() {

    return this.roleNameAdmin = this.login.escutaAutorizacao();


  }


}


