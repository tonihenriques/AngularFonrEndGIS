import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { AlimentosService } from './alimentos.service';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styleUrls: ['./alimentos.component.css']
})
export class AlimentosComponent implements OnInit {

constructor(private formBuilder: FormBuilder, private alimService: AlimentosService){

}

  list: any[] | any;
  listaAlimentos: any;
  retornoError: string | any;

  formulario = this.formBuilder.group({
    nome: [''],
    unidade:[null,[Validators.required]]
    
  })
  
  ngOnInit(): void {

    this.buscaAlimentos();
   
  }

 

  onSubmit() {

    const alimento ={
      'nome': this.formulario.value.nome,
      'medida': this.formulario.value.unidade
    }

   console.log("Form:" , this.formulario)
    
      this.alimService.addAlimentos(alimento)
      .subscribe({
        next:(data)=> this.list = data,
        error: (e) => { this.retornoError = e.error.text, console.log("RetornoErro = ", this.retornoError) },
        complete: () => console.info('complete'),

      })



  }

  buscaAlimentos(){
    
    this.alimService.getAlimentos()
    .subscribe({
      next:(data)=> this.listaAlimentos = data,
      error: (e) => { this.retornoError = e.error.text, console.log("RetornoErro = ", this.retornoError) },
      complete: () => console.info('complete'),
    })

  }

  deleteAlimento(id: string) {

    this.alimService.deleteAlimentos(id)
    .subscribe({
      next: () => { console.log("Delete")},
      error: (e) => {},
      complete: () => console.info('complete')
    })
  }

}
