import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarVisitanteComponent } from './cadastrar-visitante/cadastrar-visitante.component';
import { PesquisarVisitanteComponent } from './pesquisar-visitante/pesquisar-visitante.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatDatepickerModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';

const routes: Routes = [
  { path: 'pesquisar', component:  CadastrarVisitanteComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar', component:  PesquisarVisitanteComponent , data: { animation: 'buttons' }},
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarVisitanteComponent,
    PesquisarVisitanteComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class VisitanteModule { }
