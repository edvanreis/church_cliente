import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatDividerModule, MatInputModule, MatOptionModule, MatSelectModule, MatSlideToggleModule, MatRadioModule, MatDatepickerModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { IgrejaDadosComponent } from './igreja-dados.component';
import { DialogConfirmPessoaModule } from '../../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module';
import { PipeModule } from '../../../pipes/pipe.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    TextMaskModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatButtonModule,
    DialogConfirmPessoaModule,
    PipeModule,
    MatRadioModule,
    MatDatepickerModule,
  ],
  declarations: [
    IgrejaDadosComponent
  ],
  exports:[
    IgrejaDadosComponent
  ]
})
export class IgrejaDadosModule { }
