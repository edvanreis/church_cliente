import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisarGrupoComponent } from './pesquisar/pesquisar-grupo.component';
import { CadastrarGrupoComponent } from './cadastrar/cadastrar-grupo.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatTableModule, MatTabsModule, MatSelectModule, MatOptionModule, MatDividerModule, MatAutocompleteModule, MatSlideToggleModule, MatRadioModule, MatDatepickerModule, MatTooltipModule } from '@angular/material';
import { IgrejasComponentModule } from '../componentes/igrejas/igreja-compenent.module';
import { MembroComponentModule } from '../componentes/membro/membro-component.module';
import { PipeModule } from '../../pipes/pipe.module';
import { DialogAtivarInativarModule } from '../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module';
import { DialogPessoaGrupoModalidadeMusicoModule } from '../dialog/dialog-pessoa-grupo-modalidade-musico/dialog-pessoa-grupo-modalidade-musico.module';
import { DialogConfirmPessoaModule } from '../dialog/dialog-confirm-pessoa/dialog-confirm-pessoa.module';

const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarGrupoComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarGrupoComponent , data: { animation: 'buttons' }}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatOptionModule,
    IgrejasComponentModule,
    MatDividerModule,
    MembroComponentModule,
    MatAutocompleteModule,
    PipeModule,
    MatSlideToggleModule,
    DialogAtivarInativarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatTooltipModule,
    DialogPessoaGrupoModalidadeMusicoModule,
    DialogConfirmPessoaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PesquisarGrupoComponent,
    CadastrarGrupoComponent]
})
export class GrupoModule { }
