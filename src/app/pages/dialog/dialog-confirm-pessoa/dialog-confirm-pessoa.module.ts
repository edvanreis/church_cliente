import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmPessoaComponent } from './dialog-confirm-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';

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
    DialogConfirmPessoaComponent
  ],
  entryComponents: [
    DialogConfirmPessoaComponent
  ] 
})
export class DialogConfirmPessoaModule { }
