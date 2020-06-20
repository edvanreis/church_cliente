import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisarGrupoComponent } from './pesquisar/pesquisar-grupo.component';
import { CadastrarGrupoComponent } from './cadastrar/cadastrar-grupo.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatTableModule, MatTabsModule, MatSelectModule, MatOptionModule, MatDividerModule, MatAutocompleteModule, MatSlideToggleModule } from '@angular/material';
import { IgrejasCompenenteModule } from '../componentes/igrejas/igreja-compenente.module';
import { MembroComponenteModule } from '../componentes/membro/membro-componente.module';
import { PipeModule } from '../../pipes/pipe.module';
import { DialogAtivarInativarModule } from '../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module';

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
    IgrejasCompenenteModule,
    MatDividerModule,
    MembroComponenteModule,
    MatAutocompleteModule,
    PipeModule,
    MatSlideToggleModule,
    DialogAtivarInativarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PesquisarGrupoComponent,
    CadastrarGrupoComponent]
})
export class GrupoModule { }
