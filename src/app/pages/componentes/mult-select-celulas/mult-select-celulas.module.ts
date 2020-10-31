import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultSelectCelulasComponent } from './mult-select-celulas.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatSelectModule, MatOptionModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule
  ],
  declarations: [
    MultSelectCelulasComponent
  ],
  exports:[
    MultSelectCelulasComponent
  ]
})
export class MultSelectCelulasModule { }
