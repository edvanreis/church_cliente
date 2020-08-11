import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogTransferirPessoaComponent } from './dialog-transferir-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { IgrejasComponenteModule } from '../../componentes/igrejas/igreja-compenente.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    IgrejasComponenteModule,
  ],
  declarations: [
    DialogTransferirPessoaComponent
  ],
  entryComponents:[
    DialogTransferirPessoaComponent
  ]
})
export class DialogTransferirPessoaModule { }
