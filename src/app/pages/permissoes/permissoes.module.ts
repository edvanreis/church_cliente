import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarPermissoesComponent } from './pesquisar/pesquisar-permissoes.component';
import { CadastrarPermissoesComponent } from './cadastrar/cadastrar-permissoes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';
import { DialogRemoverPermissaoModule } from '../dialog/dialog-remover-permissao/dialog-remover-permissao.module';

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
    DialogRemoverPermissaoModule,
    MatTooltipModule,
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
