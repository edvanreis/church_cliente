import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarAgendamentoPessoaComponent } from './cadastrar/cadastrar-agendamento-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { PipeModule } from '../../pipes/pipe.module';
import { IgrejasComponenteModule } from '../componentes/igrejas/igreja-compenente.module';
import { RouterModule, Routes } from '@angular/router';
import { PesquisarAgendamentoComponent } from './pesquisar/pesquisar-agendamento.component';
import { DialogAgendamentoConfirmComponent } from './dialog-agendamento-confirm/dialog-agendamento-confirm.component';
import { DialogAgendamentoConfirmModule } from './dialog-agendamento-confirm/dialog-agendamento-confirm.module';



const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarAgendamentoPessoaComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarAgendamentoComponent , data: { animation: 'buttons' }},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    TextMaskModule,
    MatSelectModule,
    MatOptionModule,
    PipeModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    IgrejasComponenteModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    DialogAgendamentoConfirmModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarAgendamentoPessoaComponent,
    PesquisarAgendamentoComponent
  ]
})
export class AgendamentoModule { }
