import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisarIgrejaComponent } from './pesquisar/pesquisar-igreja.component';
import { CadastrarIgrejaComponent } from './cadastrar/cadastrar-igreja.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CadastrarIgrejaComponent, 
    PesquisarIgrejaComponent
  ]
})
export class IgrejasModule { }
