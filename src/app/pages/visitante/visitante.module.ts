import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';
import { CadastrarVisitanteComponent } from './cadastrar/cadastrar-visitante.component';
import { PesquisarVisitanteComponent } from './pesquisar/pesquisar-visitante.component';
import { PessoaModule } from '../componentes/pessoa/pessoa.module';
import { EnderecoModule } from '../componentes/endereco/endereco.module';
import { ContatosModule } from '../componentes/contatos/contatos.module';
import { VisitanteService } from '../../service/visitante.service';

const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarVisitanteComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar', component:  CadastrarVisitanteComponent , data: { animation: 'buttons' }},
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
    PessoaModule,
    MatDividerModule,
    EnderecoModule,
    ContatosModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarVisitanteComponent,
    PesquisarVisitanteComponent
  ],
  providers: [
    VisitanteService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class VisitanteModule { }
