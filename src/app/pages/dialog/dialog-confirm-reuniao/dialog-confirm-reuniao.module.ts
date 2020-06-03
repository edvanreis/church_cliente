import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmReuniaoComponent } from './dialog-confirm-reuniao.component';
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
    DialogConfirmReuniaoComponent
  ],
  entryComponents: [
    DialogConfirmReuniaoComponent
  ]
})
export class DialogConfirmReuniaoModule { }
