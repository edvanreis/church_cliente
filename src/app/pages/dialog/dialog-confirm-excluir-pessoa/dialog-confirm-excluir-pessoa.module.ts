import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { DialogConfirmExcluirPesssoaComponent } from './dialog-confirm-excluir-pessoa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule
  ],
  declarations: [
    DialogConfirmExcluirPesssoaComponent
  ],
  entryComponents: [
    DialogConfirmExcluirPesssoaComponent
  ]
})
export class DialogConfirmExcluirPessoaModule { }
