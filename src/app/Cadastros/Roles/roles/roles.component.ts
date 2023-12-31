import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RolesService } from '../roles.service';
import { Observable, Subject } from 'rxjs';
import {  Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { FormBuilder } from '@angular/forms';
import { ModalService } from 'src/app/Shared/modal-service.service';




interface role {
  id: string;
  Nome: string
}


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {

  modalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;
  roleId: string | any;
  message?: string;
  roles: role | any;
  ms: boolean = false;
  role$: Observable<role> | any;
  erro$ = new Subject<boolean>();

  error: boolean | any;
  success: boolean | any;

  dados: role | undefined


  

  constructor(private roleService: RolesService, private modalService: BsModalService
    ) {

  }

  
  alerts: any[] = [{
    type: 'success',
    msg: `Exclusão realizada com sucesso  em  ${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString()}`,
    timeout: 7000,

  },
  {
    type: 'danger',
    msg: `ERROR: Ocorreu um erro inesperado  em  ${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString()}`,
    timeout: 7000,

  }
  ];

  ngOnInit(): void {
    this.getRoles();

  }

  
  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }


  getRoles() {
    this.roleService.getRoles()
      .subscribe({
        next: (data) => { this.role$ = data, this.dados = data, console.log("Dados", this.role$)},
        error: (e) => this.erro$ = e,
        complete: () => console.info('complete')

      })
  }

  onRefresh(){        
    setTimeout(()=>{                          
      window.location.reload()
    }, 3000);

  }
  deletRoles(id: string) { 

    this.roleId = id;
    this.modalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    console.log("entrou bonito!")
   
  }

 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {

    this.roleService.deleteRoles(this.roleId)
      .subscribe({
        next: () => { console.log("Delete"), this.success = true},
        error: (e) => {this.erro$ = e, this.error = false},
        complete: () => console.info('complete')
      })

      this.modalRef?.hide();

    this.onRefresh();
   
  }
 
  decline(): void {
    
    this.modalRef?.hide();
  }


}
