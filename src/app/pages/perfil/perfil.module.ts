import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarPermissoesComponent } from '../permissoes/cadastrar/cadastrar-permissoes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { DialogRemoverModule } from '../dialog/dialog-remover/dialog-remover.module';
import { PesquisarPerfilComponent } from './pesquisar/pesquisar-perfil.component';
import { CadastrarPerfilComponent } from './cadastrar/cadastrar-perfil.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';

const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarPerfilComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar', component:  CadastrarPerfilComponent, data: { animation: 'buttons' }},
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
],
  declarations: [
    PesquisarPerfilComponent,
    CadastrarPerfilComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class PerfilModule { }
