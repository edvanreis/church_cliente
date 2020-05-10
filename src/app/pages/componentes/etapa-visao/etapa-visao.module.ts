import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtapaVisaoComponent } from './etapa-visao.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule, MatOptionModule, MatButtonModule } from '@angular/material';
import { DialogConfirmModule } from '../../dialog/dialog-confirm/dialog-confirm.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    DialogConfirmModule
  ],
  declarations: [
    EtapaVisaoComponent
  ],exports:[
    EtapaVisaoComponent
  ]
})
export class EtapaVisaoModule { }
