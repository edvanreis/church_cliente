import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultSelectEtapaVisaoComponent } from './mult-select-etapa-visao.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule, MatOptionModule, MatButtonModule, MatAutocompleteModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { DialogConfirmModule } from '../../dialog/dialog-confirm/dialog-confirm.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    DialogConfirmModule,
    MatAutocompleteModule,
  ],
  declarations: [
    MultSelectEtapaVisaoComponent
  ],exports:[
    MultSelectEtapaVisaoComponent
  ]
})
export class MultSelectEtapaVisaoModule { }
