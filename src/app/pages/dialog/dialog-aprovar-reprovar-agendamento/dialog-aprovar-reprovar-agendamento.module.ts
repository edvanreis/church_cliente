import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatInputModule } from '@angular/material';
import { DialogAprovarReprovarAgendamentoComponent } from './dialog-aprovar-reprovar-agendamento.component';

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
    DialogAprovarReprovarAgendamentoComponent
  ],
  entryComponents:[
    DialogAprovarReprovarAgendamentoComponent
  ]
})
export class DialogAprovarReprovarAgendamentoModule { }
