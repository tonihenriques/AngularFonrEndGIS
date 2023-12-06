import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RolesService } from '../../Roles/roles.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ServicesUsuario } from '../../services-usuario.service';


interface role {
  id: string;
  Nome: string
}


@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})

export class ListaUsuarioComponent implements OnInit {

  constructor(private roleService: RolesService, private modalService: BsModalService, private serviceuser: ServicesUsuario) { }
  ngOnInit(): void {
   this.getUser();
  }


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


  onClosed(dismissedAlert: AlertComponent): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }


  getUser() {
    this.serviceuser.getUsers()
      .subscribe({
        next: (data) => { this.role$ = data, this.dados = data, console.log("Dados", this.role$) },
        error: (e) => this.erro$ = e,
        complete: () => console.info('complete')

      })
  }

  onRefresh() {
    setTimeout(() => {
      window.location.reload()
    }, 3000);

  }
  deleteUser(id: string) {

    this.roleId = id;
    this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {

    this.serviceuser.deleteUser(this.roleId)
      .subscribe({
        next: () => { console.log("Delete"), this.success = true },
        error: (e) => { this.erro$ = e, this.error = false },
        complete: () => console.info('complete')
      })

    this.modalRef?.hide();

    this.onRefresh();

  }

  decline(): void {

    this.modalRef?.hide();
  }




}


