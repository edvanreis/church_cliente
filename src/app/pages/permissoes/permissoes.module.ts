import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarPermissoesComponent } from './pesquisar/pesquisar-permissoes.component';
import { CadastrarPermissoesComponent } from './cadastrar/cadastrar-permissoes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';
import { DialogRemoverComponent } from '../dialog/dialog-remover/dialog-remover.component';
import { DialogRemoverModule } from '../dialog/dialog-remover/dialog-remover.module';
import { PesquisarPerfilComponent } from '../perfil/pesquisar/pesquisar-perfil.component';

const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarPermissoesComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar', component:  CadastrarPermissoesComponent , data: { animation: 'buttons' }},
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
    MatPaginatorModule,
    MatSortModule,
    DialogRemoverModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    PesquisarPermissoesComponent
],
  declarations: [
    PesquisarPermissoesComponent,
    CadastrarPermissoesComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class PermissoesModule { }
