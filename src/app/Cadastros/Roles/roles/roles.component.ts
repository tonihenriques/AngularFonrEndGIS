import { Component, OnInit } from '@angular/core';
import { RolesService } from '../roles.service';



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

constructor( private roleService: RolesService){

}
  ngOnInit(): void {
    this.getRoles();
   
  }
  

  getRoles(){
    console.log("Entrou =", this.roles)

    this.roleService.getRoles()
    .subscribe({
      next: (data)=>  this.roles = data,           
      error: (e) => console.error(e),
      complete: () => console.info('complete')  

    }) 
    
   
  }


}
