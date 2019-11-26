import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarCelulaComponent } from './cadastrar/cadastrar-celula.component';
import { PesquisarCelulaComponent } from './pesquisar/pesquisar-celula.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CadastrarCelulaComponent,
    PesquisarCelulaComponent
  ]
})
export class CelulaModule { }
