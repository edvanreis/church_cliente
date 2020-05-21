import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmLicaoComponent } from './dialog-confirm-licao.component';
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
    DialogConfirmLicaoComponent
  ],
  entryComponents: [
    DialogConfirmLicaoComponent
  ]
})
export class DialogConfirmLicaoModule { }
