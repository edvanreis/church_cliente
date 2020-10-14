import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarAgendamentoPessoaComponent } from './cadastrar/cadastrar-agendamento-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatInputModule, MatOptionModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { PipeModule } from '../../pipes/pipe.module';
import { IgrejasComponenteModule } from '../componentes/igrejas/igreja-compenente.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarAgendamentoPessoaComponent , data: { animation: 'buttons' }},
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
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarAgendamentoPessoaComponent,
  ]
})
export class AgendamentoModule { }
