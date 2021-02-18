import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmResetSenhaComponent } from './dialog-confirm-reset-senha.component';
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
    DialogConfirmResetSenhaComponent
  ],
  entryComponents: [
    DialogConfirmResetSenhaComponent
  ]
})
export class DialogConfirmResetSenhaModule { }
