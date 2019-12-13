import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatoComponent } from '../pessoa/contato/contato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';
import { MatCheckboxModule, MatOptionModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TextMaskModule,
    MatCheckboxModule,
    MatOptionModule   
  ],
  declarations: [
    ContatoComponent
  ]
})
export class ContatosModule { }
