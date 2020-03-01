import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogInativarPessoaComponent } from './dialog-inativar-pessoa.component';
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
    DialogInativarPessoaComponent
  ],
  entryComponents: [DialogInativarPessoaComponent,PesquisarMembroComponent]  
})
export class DialogInativarPessoaModule { }
