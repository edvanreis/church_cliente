import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogHistoricoPessoaComponent } from './dialog-historico-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatTableModule, MatSortModule, MatFormFieldModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { PesquisarMembroComponent } from '../../membro/pesquisar/pesquisar/pesquisar-membro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule
  ],
  declarations: [
    DialogHistoricoPessoaComponent
  ],
  entryComponents: [DialogHistoricoPessoaComponent,PesquisarMembroComponent]  
})
export class DialogHistoricoPessoaModule { }
