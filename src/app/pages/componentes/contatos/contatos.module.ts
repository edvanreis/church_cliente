import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';
import { MatCheckboxModule, MatOptionModule, MatSelectModule, MatInputModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { ContatosComponent } from './contatos.component';
import { TipoContatoService } from '../../../service/tipo-contato.service';
import { DialogAtualizarContatoModule } from '../../dialog/dialog-atualizar-contato/dialog-atualizar-contato.module';
import { DialogConfirmModule } from '../../dialog/dialog-confirm/dialog-confirm.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TextMaskModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    DialogAtualizarContatoModule,
    DialogConfirmModule,
    MatTooltipModule
  ],
  exports: [
    ContatosComponent
  ],
  declarations: [
    ContatosComponent
  ],
  providers:[
    TipoContatoService
  ]
})
export class ContatosModule { }
