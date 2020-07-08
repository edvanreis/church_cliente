import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';
import { AgendamentoService } from '../service/agendamento.service';
import { DashboardCrmComponent } from './dashboard-crm.component';
import { DialogAprovarReprovarAgendamentoModule } from '../pages/dialog/dialog-aprovar-reprovar-agendamento/dialog-aprovar-reprovar-agendamento.module';
import { DialogAprovarReprovarMembroModule } from '../pages/dialog/dialog-aprovar-reprovar-membro/dialog-aprovar-reprovar-membro.module';


export const appRoutes: Routes = [
    { path: '', component: DashboardCrmComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    FlexLayoutModule,
    MatCardModule,
    DashboardWidgetModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    DialogAprovarReprovarAgendamentoModule,
    DialogAprovarReprovarMembroModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardCrmComponent
  ],
   providers:[
     AgendamentoService
   ]
})
export class DashboardCrmModule { }
