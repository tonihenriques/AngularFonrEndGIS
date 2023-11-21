import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RolesService } from '../roles.service';


@Component({
  selector: 'app-cadastro-roles',
  templateUrl: './cadastro-roles.component.html',
  styleUrls: ['./cadastro-roles.component.css']
})
export class CadastroRolesComponent {

  constructor(private formBuilder: FormBuilder, private roleService: RolesService){}

  formulario = this.formBuilder.group({

    nome: ['']
    
   })

   ngOnit(){
    
   }

   limpaCampos(){
    this.formulario.setValue({
      nome: '',
      
    })
  }

   onsubmit()
   {    

    const role = {
      id: Number,
      dataInclusao: Date,
      usuarioExclusao: "string",
      dataExclusao: Date,
      name: this.formulario.get('nome')?.value  
  }
  
    
    console.log("Nome = ", role)

    console.log(this.formulario.get('nome')?.value)

    this.roleService.addRoles(role)
      .subscribe({
        next: (data)=> console.log(data),
        error: (e)=> console.error(e),
        complete: () => console.info('complete') 
      });

      this.limpaCampos();


   }


}
