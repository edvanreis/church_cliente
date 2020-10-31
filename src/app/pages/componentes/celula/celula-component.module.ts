import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CelulaComponent } from './celula.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
    CelulaComponent
  ],
  exports: [
    CelulaComponent
  ],

})
export class CelulaComponentModule { }
