import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { EmitirEventoService } from '../../service/emitir-evento.service';
import { EtapaVisaoService } from '../../service/etapa-visao.service';
import { ExcelService } from '../../service/excel.service';
import { InterceptorService } from '../../service/interceptor.service';
import { CargosModule } from '../componentes/cargos/cargos.module';
import { ContatosModule } from '../componentes/contatos/contatos.module';
import { EnderecoModule } from '../componentes/endereco/endereco.module';
import { EtapaVisaoModule } from '../componentes/etapa-visao/etapa-visao.module';
import { PessoaModule } from '../componentes/pessoa/pessoa.module';
import { DialogAtivarInativarModule } from '../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module';
import { DialogConfirmPessoaModule } from '../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module';
import { DialogEnviarCartaModule } from '../dialog/dialog-enviar-carta/dialog-enviar-carta.module';
import { DialogHistoricoPessoaModule } from '../dialog/dialog-historico-pessoa/dialog-historico-pessoa.module';
import { CadastrarMembroComponent } from './cadastrar/cadastrar-membro.component';
import { PesquisarMembroComponent } from './pesquisar/pesquisar/pesquisar-membro.component';
import { DialogAprovarReprovarAgendamentoModule } from '../dialog/dialog-aprovar-reprovar-agendamento/dialog-aprovar-reprovar-agendamento.module';





const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarMembroComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarMembroComponent , data: { animation: 'buttons' }}
];
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    HttpClientModule,
    PessoaModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EnderecoModule,
    MatSlideToggleModule,
    ContatosModule,
    EtapaVisaoModule,
    DialogEnviarCartaModule,
    DialogHistoricoPessoaModule,
    MatTooltipModule,
    CargosModule,
    DialogAtivarInativarModule,
    DialogConfirmPessoaModule,
    DialogAprovarReprovarAgendamentoModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
],
  declarations: [
    CadastrarMembroComponent,
    PesquisarMembroComponent
  ],
  providers: [
    EmitirEventoService,
    ExcelService,
    EtapaVisaoService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class MembroModule { }
