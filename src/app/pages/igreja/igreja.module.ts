import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisarIgrejaComponent } from './pesquisar/pesquisar-igreja.component';
import { CadastrarIgrejaComponent } from './cadastrar/cadastrar-igreja.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatOptionModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { DialogRemoverPerfilModule } from '../dialog/dialog-remover-perfil/dialog-remover-perfil.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';

const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarIgrejaComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarIgrejaComponent , data: { animation: 'buttons' }}
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
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarIgrejaComponent, 
    PesquisarIgrejaComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class IgrejaModule { }
