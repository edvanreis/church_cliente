import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmPessoaReuniaoComponent } from './dialog-confirm-pessoa-reuniao.component';
import { MatToolbarModule, MatButtonModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    DialogConfirmPessoaReuniaoComponent
  ],
  entryComponents:[
    DialogConfirmPessoaReuniaoComponent
  ]
})
export class DialogConfirmPessoaReuniaoModule { }
