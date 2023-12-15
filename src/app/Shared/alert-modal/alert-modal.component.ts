import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';


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
