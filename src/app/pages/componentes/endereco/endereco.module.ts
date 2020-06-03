import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnderecoComponent } from './endereco.component';
import { MatCheckboxModule, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogConfirmModule } from '../../dialog/dialog-confirm/dialog-confirm.module';
import { DialogAtualizarEnderecoModule } from '../../dialog/dialog-atualizar-endereco/dialog-atualizar-endereco.module';
import { PipeModule } from '../../../pipes/pipe.module';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    TextMaskModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    DialogConfirmModule,
    DialogAtualizarEnderecoModule,
    PipeModule
  ],
  exports :[
    EnderecoComponent
  ],
  declarations: [
    EnderecoComponent
  ]
})
export class EnderecoModule { }
