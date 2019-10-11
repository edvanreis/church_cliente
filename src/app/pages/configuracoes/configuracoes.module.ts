import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { PesquisarPermissoesComponent } from './permissoes/pesquisar-permissoes/pesquisar-permissoes.component';
import { CadastrarPermissoesComponent } from './permissoes/cadastrar-permissoes/cadastrar-permissoes.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';
import { AppComponent } from '../../app.component';
import { providers } from 'ng2-dnd';
import { CadastrarComponent } from './perfil/cadastrar/cadastrar.component';


const routes: Routes = [
  { path: 'permissoes', component:  PesquisarPermissoesComponent , data: { animation: 'buttons' }},
  { path: 'add-permissoes', component:  CadastrarPermissoesComponent , data: { animation: 'buttons' }},
  { path: ':id/add-permissoes', component:  CadastrarPermissoesComponent , data: { animation: 'buttons' }},
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
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
],
  declarations: [
    PesquisarPermissoesComponent,
    CadastrarPermissoesComponent,
    CadastrarPermissoesComponent,
    CadastrarComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class ConfiguracoesModule { }
