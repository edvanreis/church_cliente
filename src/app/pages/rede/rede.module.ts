import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterceptorService } from '../../service/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CadastrarRedeComponent } from './cadastrar/cadastrar-rede.component';
import { PesquisarRedeComponent } from './pesquisar/pesquisar-rede.component';
import { Routes, RouterModule } from '@angular/router';
import { MatDatepickerModule, MatToolbarModule, MatButtonModule, MatInputModule, MatSelectModule, MatOptionModule, MatAutocompleteModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembroComponent } from '../componentes/membro/membro.component';
import { MembroComponenteModule } from '../componentes/membro/membro-componente.module';

const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarRedeComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar', component:  CadastrarRedeComponent , data: { animation: 'buttons' }},
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
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MembroComponenteModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarRedeComponent,
    PesquisarRedeComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class RedeModule { }
