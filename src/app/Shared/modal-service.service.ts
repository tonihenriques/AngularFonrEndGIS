import { Injectable } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  element: any;

  
  constructor(private alertmodal: AlertModalComponent, private modalService: BsModalService,) { }


  openAlertModal(title: string, msg: string){

    const modalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    modalRef.content.title = title;
    modalRef.content.msg = msg;
   

  }


}
