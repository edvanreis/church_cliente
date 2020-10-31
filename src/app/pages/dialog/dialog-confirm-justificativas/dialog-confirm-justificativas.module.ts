import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmJustificativasComponent } from './dialog-confirm-justificativas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';

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
    DialogConfirmJustificativasComponent
  ],
  entryComponents: [
    DialogConfirmJustificativasComponent
  ]
})
export class DialogConfirmJustificativasModule { }
