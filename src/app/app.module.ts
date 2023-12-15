import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

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
import { HomeComponent } from './Cadastros/home/home.component';
import { AgmCoreModule, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxGoogleMapsModule } from '@codious/ngx-google-maps';
import { HungerMapComponent } from './Cadastros/hunger-map/hunger-map.component';
import { HungerServiceService } from './Cadastros/hunger-map/hunger-service.service';
//import { GoogleMapsModule } from '@angular/google-maps';



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
    HungerMapComponent,  
   
     
   
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw',
      //apiKey: 'AIzaSyCSQF5WSpamzMF5z1PVnzYyH5npple21zQ',
      libraries: ["places"]
      
    }),  
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5130"],
        disallowedRoutes: []
      }
    }),   
    NgxGoogleMapsModule.forRoot({
      key: '', // your Google API key retrieved from the Google Developer Console
      language: 'pt', // see https://developers.google.com/maps/documentation/javascript/localization
      libraries: 'geometry', // see https://developers.google.com/maps/documentation/javascript/libraries
      loadScript: true || false, // whether or not the <script> tag of the Google Maps API should be loaded
      options: { panControl: true, panControlOptions: { position: 9 } }, // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions
      region: 'Br', // see https://developers.google.com/maps/documentation/javascript/localization#Region
    }),
 
    NgbModule,
    BrowserAnimationsModule,
    CadastroRolesModule,
    GooglePlaceModule,
    //GoogleMapsModule
   
  ],
    
    providers: [LoginsServiceService, AuthGuard ,ServicesUsuario,  BsModalService, ModalService, AlertModalComponent,BaseUrlComponent, HungerServiceService ] , 
  bootstrap: [AppComponent]
})
export class AppModule { }
