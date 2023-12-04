import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RolesService } from '../roles.service';
import { Observable, Subject, Subscription, combineLatest, isEmpty, timer } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/Shared/modal-service.service';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';


interface role {

  id: number;
  Nome: string
}


@Component({
  selector: 'app-cadastro-roles',
  templateUrl: './cadastro-roles.component.html',
  styleUrls: ['./cadastro-roles.component.css']
})
export class CadastroRolesComponent implements OnDestroy, OnInit {

  role: any = {
    nome: ''
  }
  modalRef?: BsModalRef;
  subscriptions: Subscription[] = [];
  ms: boolean = false;


  cadastro$: Observable<role> | any;
  erro$: Observable<string> | any;
  subscription: Subscription | any;
  retorno: string | undefined;
  success: boolean | any;
  error: boolean | any;

  constructor(private formBuilder: FormBuilder, private roleService: RolesService, private modalService: BsModalService,
    private changeDetection: ChangeDetectorRef, private SmodalService: ModalService) { }

  ngOnInit(): void {

  }

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

  openModalService(){

    this.SmodalService.openAlertModal("Succsses", "Cadastro Confirmado!");
  };


  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  formulario = this.formBuilder.group({
    nome: ['', [Validators.required]]
  })

  ngOnit() {

  }

  limpaCampos() {
    this.formulario.setValue({
      nome: '',

    })
  }

  onsubmit() {

    const role = {
      id: Number,
      dataInclusao: Date,
      usuarioExclusao: "string",
      dataExclusao: Date,
      name: this.formulario.get('nome')?.value
    }

    var textErro: string;

    console.log("Nome =", this.formulario.get('nome')?.value)

    this.roleService.addRoles(role)
      .subscribe({
        next: (data) => { this.cadastro$ = data, this.success = true, this.error = false, this.limpaCampos()},
        error: (e) => { this.erro$ = e, this.retorno = e.error.text, this.error = true, this.success = false ,this.openModalService() },
        complete: () => console.info('complete'),

      });

   
  }


  ngOnDestroy(): void {
    this.erro$.next(true);
    this.erro$.complete();
  }


  listaData() {
    console.log("Lista_Data =", this.cadastro$)
  }

  vericaValidTouched(campo: any) {

    return this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
  }

  aplicaCssErro(campo: any) {
    console.log("nome do campo ", campo)
    return {
      'has-error': this.vericaValidTouched(campo),
      'has-feedback': this.vericaValidTouched(campo)
    }
  }


}
