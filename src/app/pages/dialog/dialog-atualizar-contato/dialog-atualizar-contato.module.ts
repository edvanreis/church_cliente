import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAtualizarContatoComponent } from './dialog-atualizar-contato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatOptionModule, MatSelectModule} from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    TextMaskModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    DialogAtualizarContatoComponent
  ],
  entryComponents: [
    DialogAtualizarContatoComponent
  ] 
})
export class DialogAtualizarContatoModule { }
