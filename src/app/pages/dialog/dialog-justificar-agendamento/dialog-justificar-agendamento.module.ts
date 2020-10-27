import { MatInputModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogJustificarAgendamentoComponent } from './dialog-justificar-agendamento.component';

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
  DialogJustificarAgendamentoComponent
],
entryComponents: [
  DialogJustificarAgendamentoComponent
]
})
export class DialogJustificarAgendamentoModule { }
