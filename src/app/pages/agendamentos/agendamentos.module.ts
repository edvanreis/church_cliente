import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule, MatToolbarModule, MatSlideToggleModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { PipeModule } from '../../pipes/pipe.module';
import { InterceptorService } from '../../service/interceptor.service';
import { CadastrarAgendamentosComponent } from './cadastrar/cadastrar-agendamentos.component';
import { PesquisarAgendamentosComponent } from './pesquisar/pesquisar-agendamentos.component';
import { EnderecoModule } from '../componentes/endereco/endereco.module';

const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarAgendamentosComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarAgendamentosComponent , data: { animation: 'buttons' }}
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
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarAgendamentosComponent,
    PesquisarAgendamentosComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class AgendamentosModule { }
