import { ChangeDetectorRef, Component, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { RolesService } from 'src/app/Cadastros/Roles/roles.service';

interface role{
  id: number;
  Nome: string
}

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})

export class AlertModalComponent {

   @Input() title: string | any;
   @Input() msg: string | any;
   @Input() func: string | any;

  modalRef?: BsModalRef;
  subscriptions: Subscription[] = [];
  messages: string[] = [];

  ms: boolean = false;

  cadastro$: Observable<role> | any;
  erro$: Observable<string> | any; 

   constructor( ){}



}
