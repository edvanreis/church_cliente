import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgrejasComponent } from './igrejas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  declarations: [
    IgrejasComponent
  ],
  exports: [
    IgrejasComponent
  ]
})
export class IgrejasCompenenteModule { }
