import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedesComponent } from './redes.component';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    RedesComponent
  ],
  exports: [
    RedesComponent
  ]
})
export class RedesComponenteModule { }
