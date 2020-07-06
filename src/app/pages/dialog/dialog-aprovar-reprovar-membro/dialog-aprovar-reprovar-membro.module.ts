import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAprovarReprovarMembroComponent } from './dialog-aprovar-reprovar-membro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [
    DialogAprovarReprovarMembroComponent
  ],
  entryComponents:[
    DialogAprovarReprovarMembroComponent
  ],
})
export class DialogAprovarReprovarMembroModule { }
