import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisarGrupoComponent } from './pesquisar/pesquisar-grupo.component';
import { CadastrarGrupoComponent } from './cadastrar/cadastrar-grupo.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    RouterModule.forChild(routes)
  ],
  declarations: [
    PesquisarGrupoComponent, 
    CadastrarGrupoComponent]
})
export class GrupoModule { }
