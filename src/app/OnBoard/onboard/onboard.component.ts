import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-onboard',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css'],
  
})
export class OnboardComponent {

  
  constructor( private router: Router) {
  }



  cadastroAnjo(){

    this.router.navigate(['/', 'onboard']);

  }
  

  cadastroCarente(){

    this.router.navigate(['/', 'onboard']);

  }

}