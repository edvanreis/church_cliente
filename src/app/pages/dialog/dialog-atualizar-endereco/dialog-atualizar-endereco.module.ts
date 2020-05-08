import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAtualizarEnderecoComponent } from './dialog-atualizar-endereco.component';
import { MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatIconModule, MatButtonModule, MatOptionModule, MatSelectModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { PipeModule } from '../../../pipe/pipe/pipe.module';

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
    PipeModule,

  ],
  declarations: [
    DialogAtualizarEnderecoComponent
  ],
  entryComponents: [
    DialogAtualizarEnderecoComponent
  ] 
})
export class DialogAtualizarEnderecoModule { }
