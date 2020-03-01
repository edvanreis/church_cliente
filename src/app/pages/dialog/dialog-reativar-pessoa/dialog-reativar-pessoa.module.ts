import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogReativarPessoaComponent } from './dialog-reativar-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatInputModule } from '@angular/material';
import { PesquisarMembroComponent } from '../../membro/pesquisar/pesquisar/pesquisar-membro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [
    DialogReativarPessoaComponent
  ],
  entryComponents: [DialogReativarPessoaComponent,PesquisarMembroComponent]  
})
export class DialogReativarPessoaModule { }
