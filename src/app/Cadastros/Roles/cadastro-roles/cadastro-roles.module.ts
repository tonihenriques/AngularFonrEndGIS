import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroRolesComponent } from './cadastro-roles.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { AlertModalComponent } from 'src/app/Shared/alert-modal/alert-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';



@NgModule({
  declarations: [ 
    CadastroRolesComponent,
    AlertModalComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,   
    FormsModule,    
    ReactiveFormsModule ,
    NgbAlertModule,    
    NgFor,   
    AlertModule.forRoot(),  
    NgbAlertModule, 
  ],
  providers: [ AlertModalComponent ] , 
  bootstrap: [AppComponent]
})
export class CadastroRolesModule { }
