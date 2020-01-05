import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarCelulaComponent } from './cadastrar/cadastrar-celula.component';
import { PesquisarCelulaComponent } from './pesquisar/pesquisar-celula.component';
import { Routes, RouterModule } from '@angular/router';
import { InterceptorService } from '../../service/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatDatepickerModule } from '@angular/material';
import { EnderecoModule } from '../componentes/endereco/endereco.module';



const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarCelulaComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarCelulaComponent , data: { animation: 'buttons' }}
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
    EnderecoModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarCelulaComponent,
    PesquisarCelulaComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class CelulaModule { }
