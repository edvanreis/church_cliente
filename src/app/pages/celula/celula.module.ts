import { IgrejasComponenteModule } from './../componentes/igrejas/igreja-compenente.module';
import { DialogTransferirPessoaModule } from './../dialog/dialog-transferir-pessoa/dialog-transferir-pessoa.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarCelulaComponent } from './cadastrar/cadastrar-celula.component';
import { PesquisarCelulaComponent } from './pesquisar/pesquisar-celula.component';
import { Routes, RouterModule } from '@angular/router';
import { InterceptorService } from '../../service/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatDatepickerModule, MatSelectModule, MatOptionModule, MatAutocompleteModule, MatTableModule, MatPaginatorModule, MatDividerModule, MatAutocompleteSelectedEvent, MatTooltipModule, MatSlideToggleModule } from '@angular/material';
import { EnderecoModule } from '../componentes/endereco/endereco.module';
import { MembroComponenteModule } from '../componentes/membro/membro-componente.module';
import { TextMaskModule } from 'angular2-text-mask';
import { RedesComponenteModule } from '../componentes/redes/redes-componente.module';
import { DialogAtivarInativarModule } from '../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module';
import { DialogConfirmPessoaModule } from '../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module';
import { PipeModule } from '../../pipes/pipe.module';
import { CelulaPessoasComponent } from './pessoas/celula-pessoas.component';







const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarCelulaComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarCelulaComponent , data: { animation: 'buttons' }},
  { path: 'pessoas'   , component:  CelulaPessoasComponent   , data: { animation: 'buttons' }},
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
    EnderecoModule,
    MembroComponenteModule,
    IgrejasComponenteModule,
    TextMaskModule,
    MatSelectModule,
    MatOptionModule,
    RedesComponenteModule,
    MembroComponenteModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    DialogAtivarInativarModule,
    DialogConfirmPessoaModule,
    PipeModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSlideToggleModule,
    DialogTransferirPessoaModule,
    IgrejasComponenteModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarCelulaComponent,
    PesquisarCelulaComponent,
    CelulaPessoasComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class CelulaModule { }
