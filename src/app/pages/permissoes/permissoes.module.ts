import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatToolbarModule, MatTooltipModule, MatPaginatorModule, MatTableModule, MatSortModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { InterceptorService } from '../../service/interceptor.service';
import { DialogRemoverPermissaoModule } from '../dialog/dialog-remover-permissao/dialog-remover-permissao.module';
import { CadastrarPermissoesComponent } from './cadastrar/cadastrar-permissoes.component';
import { PesquisarPermissoesComponent } from './pesquisar/pesquisar-permissoes.component';

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
    DialogRemoverPermissaoModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
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
