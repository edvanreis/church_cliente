import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatTableModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { InterceptorService } from '../../service/interceptor.service';
import { IgrejasComponenteModule } from '../componentes/igrejas/igreja-compenente.module';
import { MembroComponenteModule } from '../componentes/membro/membro-componente.module';
import { RedesComponenteModule } from '../componentes/redes/redes-componente.module';
import { DialogAtivarInativarModule } from '../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module';
import { DialogConfirmPessoaModule } from '../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module';
import { DialogTransferirPessoaModule } from './../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.module';
import { CadastrarRedeComponent } from './cadastrar/cadastrar-rede.component';
import { PesquisarRedeComponent } from './pesquisar/pesquisar-rede.component';
import { RedePessoasComponent } from './pessoas/rede-pessoas.component';



const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarRedeComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar', component:  CadastrarRedeComponent , data: { animation: 'buttons' }},
  { path: 'pessoas'  , component:  RedePessoasComponent   , data: { animation: 'buttons' }},
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
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MembroComponenteModule,
    IgrejasComponenteModule,
    MatTableModule,
    MatPaginatorModule,
    DialogAtivarInativarModule,
    DialogConfirmPessoaModule,
    MatTooltipModule,
    IgrejasComponenteModule,
    RedesComponenteModule,
    DialogTransferirPessoaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarRedeComponent,
    PesquisarRedeComponent,
    RedePessoasComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class RedeModule { }
