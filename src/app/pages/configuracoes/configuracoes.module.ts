import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatInputModule, MatButtonModule } from '@angular/material';
import { AddPermissoesComponent } from './permissoes/add-permissoes.component';

const routes: Routes = [
  // { path: 'permissoes', component:  PermissoesComponent , data: { animation: 'buttons' }},
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
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
],
  declarations: [
    AddPermissoesComponent
  ]
})
export class ConfiguracoesModule { }
