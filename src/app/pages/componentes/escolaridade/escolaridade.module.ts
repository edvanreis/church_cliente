import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscolaridadeComponent } from './escolaridade.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogConfirmModule } from '../../dialog/dialog-confirm/dialog-confirm.module';
import { MatSelectModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    DialogConfirmModule,
    MatTooltipModule
  ],
  declarations: [
    EscolaridadeComponent
  ],
  exports: [
    EscolaridadeComponent
  ]
})
export class EscolaridadeModule { }
