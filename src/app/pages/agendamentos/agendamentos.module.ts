import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule, MatToolbarModule, MatSlideToggleModule, MatTooltipModule, MatRadioModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { PipeModule } from '../../pipes/pipe.module';
import { InterceptorService } from '../../service/interceptor.service';
import { CadastrarAgendamentosComponent } from './cadastrar/cadastrar-agendamentos.component';
import { PesquisarAgendamentosComponent } from './pesquisar/pesquisar-agendamentos.component';
import { EnderecoModule } from '../componentes/endereco/endereco.module';
import { DialogAprovarReprovarAgendamentoComponent } from '../dialog/dialog-aprovar-reprovar-agendamento/dialog-aprovar-reprovar-agendamento.component';
import { DialogAprovarReprovarAgendamentoModule } from '../dialog/dialog-aprovar-reprovar-agendamento/dialog-aprovar-reprovar-agendamento.module';
import { DialogConfirmAgandamentoModule } from '../dialog/dialog-confirm-agandamento/dialog-confirm-agandamento.module';
import { DialogConfirmPessoaModule } from '../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module';
import { CadastrarCultoComponent } from './cadastrar-culto/cadastrar-culto.component';
import { PessoasAgendadasComponent } from './pessoas-agendadas/pessoas-agendadas.component';
import { IgrejasComponenteModule } from '../componentes/igrejas/igreja-compenente.module';
import { DashboardWidgetModule } from '../../dashboard-widget/dashboard-widget.module';
import { DialogJustificarAgendamentoModule } from '../dialog/dialog-justificar-agendamento/dialog-justificar-agendamento.module';


const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarAgendamentosComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarAgendamentosComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar-culto', component:  CadastrarCultoComponent , data: { animation: 'buttons' }},
  { path: 'pessoas-agendadas', component:  PessoasAgendadasComponent , data: { animation: 'buttons' }}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    PipeModule,
    MatExpansionModule,
    MatCardModule,
    TextMaskModule,
    MatCheckboxModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    EnderecoModule,
    DialogAprovarReprovarAgendamentoModule,
    DialogConfirmAgandamentoModule,
    DialogConfirmPessoaModule,
    MatTooltipModule,
    IgrejasComponenteModule,
    MatSlideToggleModule,
    MatRadioModule,
    DashboardWidgetModule,
    DialogJustificarAgendamentoModule,
    MatSelectModule,
    MatOptionModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarAgendamentosComponent,
    PesquisarAgendamentosComponent,
    CadastrarCultoComponent,
    PessoasAgendadasComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class AgendamentosModule { }
