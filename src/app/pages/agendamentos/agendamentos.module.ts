import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarAgendamentosComponent } from './cadastrar/cadastrar-agendamentos.component';
import { PesquisarAgendamentosComponent } from './pesquisar/pesquisar-agendamentos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatDatepickerModule, MatTableModule, MatPaginatorModule, MatAutocompleteModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';

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
