import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmAgandamentoComponent } from './dialog-confirm-agandamento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [
    DialogConfirmAgandamentoComponent
  ],
  entryComponents:[
    DialogConfirmAgandamentoComponent
  ]
})
export class DialogConfirmAgandamentoModule { }
