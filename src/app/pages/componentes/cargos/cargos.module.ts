import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargosComponent } from './cargos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatAutocompleteModule, MatButtonModule, MatSelectModule, MatOptionModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  declarations: [
    CargosComponent
  ],
  exports:[
    CargosComponent
  ]
})
export class CargosModule { }
