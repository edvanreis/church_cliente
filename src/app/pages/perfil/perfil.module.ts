import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule, MatAutocompleteModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { InterceptorService } from '../../service/interceptor.service';
import { CadastrarPerfilComponent } from './cadastrar/cadastrar-perfil.component';
import { PesquisarPerfilComponent } from './pesquisar/pesquisar-perfil.component';



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
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
],
  declarations: [
    PesquisarPerfilComponent,
    CadastrarPerfilComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})    
export class PerfilModule { }
