import { Component, OnInit } from '@angular/core';
import { RolesService } from '../roles.service';
import { Observable, Subject, catchError } from 'rxjs';



interface role{

  id: number;
  Nome: string
}


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {

  roles: role | any;
  ms: boolean = false;
  role$: Observable<role> | any;
  erro$ = new Subject<boolean>();

constructor( private roleService: RolesService){

}
  ngOnInit(): void {
    this.getRoles();
   
  }
  

  getRoles(){
    console.log("Entrou =", this.roles)

     this.roleService.getRoles()
    .subscribe({
      next: (data)=>  this.role$ = data,           
      error: (e)=> this.erro$.next(true), 
      complete: () => console.info('complete')  

    }) 
    
   console.log("roles$ =", this.role$)
   console.log("erro$ =", this.erro$)
  }


}
