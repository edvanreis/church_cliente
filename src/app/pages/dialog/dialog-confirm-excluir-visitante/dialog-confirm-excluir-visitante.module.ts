import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmExcluirVisitanteComponent } from './dialog-confirm-excluir-visitante.component';
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
    DialogConfirmExcluirVisitanteComponent
  ],
  entryComponents: [
    DialogConfirmExcluirVisitanteComponent
  ]
})
export class DialogConfirmExcluirVisitanteModule { }
