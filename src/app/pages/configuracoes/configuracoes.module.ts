import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { InterceptorService } from '../../service/interceptor.service';




// const routes: Routes = [
//   { path: 'pesquisar', component:  PesquisarPermissoesComponent , data: { animation: 'buttons' }},
//   { path: 'cadastrar', component:  CadastrarPermissoesComponent , data: { animation: 'buttons' }},
// ];

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
    // RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
],
  declarations: [

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class ConfiguracoesModule { }
