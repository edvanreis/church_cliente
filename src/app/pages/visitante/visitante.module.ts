import { PipeModule } from './../../pipes/pipe.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatTableModule, MatSortModule, MatTooltipModule, MatNativeDateModule, MatSelectModule, MatOptionModule, MatAutocompleteModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';
import { CadastrarVisitanteComponent } from './cadastrar/cadastrar-visitante.component';
import { PesquisarVisitanteComponent } from './pesquisar/pesquisar-visitante.component';
import { PessoaModule } from '../componentes/pessoa/pessoa.module';
import { EnderecoModule } from '../componentes/endereco/endereco.module';
import { ContatosModule } from '../componentes/contatos/contatos.module';
import { VisitanteService } from '../../service/visitante.service';
import { EscolaridadeService } from '../../service/escolaridade.service';
import {  DialogConfirmExcluirPessoaModule } from '../dialog/dialog-confirm-excluir-pessoa/dialog-confirm-excluir-pessoa.module';
import { DialogConfirmCriarVisitanteModule } from '../dialog/dialog-confirm-criar-visitante/dialog-confirm-criar-visitante.module';
import { TextMaskModule } from 'angular2-text-mask';
import { IgrejasComponenteModule } from '../componentes/igrejas/igreja-compenente.module';
import { TransferirVisitanteComponent } from './transferir/transferir-visitante.component';


const routes: Routes = [
  { path: 'pesquisar',  component:  PesquisarVisitanteComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar',  component:  CadastrarVisitanteComponent , data: { animation: 'buttons' }},
  { path: 'transferir', component:  TransferirVisitanteComponent , data: { animation: 'buttons' }},
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
    MatTooltipModule,
    DialogConfirmExcluirPessoaModule,
    DialogConfirmCriarVisitanteModule,
    MatNativeDateModule,
    TextMaskModule,
    MatOptionModule,
    MatSelectModule,
    PipeModule,
    IgrejasComponenteModule,
    MatAutocompleteModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarVisitanteComponent,
    PesquisarVisitanteComponent,
    TransferirVisitanteComponent
  ],
  providers: [
    VisitanteService,
    EscolaridadeService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class VisitanteModule { }
