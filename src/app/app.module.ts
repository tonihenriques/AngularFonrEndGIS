import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginsServiceService } from './logins-service.service';
import { AuthGuard } from './Guards/auth-guard';
import { UsuarioComponent } from './Cadastros/usuario/usuario.component';
import { ServicesUsuario } from './Cadastros/services-usuario.service';
import { RolesComponent } from './Cadastros/Roles/roles/roles.component';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { AlertModalComponent } from './Shared/alert-modal/alert-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from './Shared/modal-service.service';
import { CadastroRolesModule } from './Cadastros/Roles/cadastro-roles/cadastro-roles.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ListaUsuarioComponent } from './Cadastros/usuario/lista-usuario/lista-usuario.component';
import { BaseUrlComponent } from './Shared/base-url/base-url.component';



export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuarioComponent,
    RolesComponent,
    ListaUsuarioComponent,
    BaseUrlComponent,  
     
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule ,
    NgbAlertModule,    
    NgFor,    
    AlertModule.forRoot(),   
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5130"],
        disallowedRoutes: []
      }
    }),
    NgbModule,
    BrowserAnimationsModule,
    CadastroRolesModule,
    
  ],
    
    providers: [LoginsServiceService, AuthGuard ,ServicesUsuario,  BsModalService, ModalService, AlertModalComponent,BaseUrlComponent ] , 
  bootstrap: [AppComponent]
})
export class AppModule { }
