import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatInputModule, MatOptionModule, MatSelectModule, MatToolbarModule, MatTableModule, MatPaginator, MatPaginatorModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { InterceptorService } from '../../service/interceptor.service';
import { IgrejasCompenenteModule } from '../componentes/igrejas/igreja-compenente.module';
import { MembroComponenteModule } from '../componentes/membro/membro-componente.module';
import { CadastrarRedeComponent } from './cadastrar/cadastrar-rede.component';
import { PesquisarRedeComponent } from './pesquisar/pesquisar-rede.component';
import { DialogAtivarInativarModule } from '../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module';



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
    IgrejasCompenenteModule,
    MatTableModule,
    MatPaginatorModule,
    DialogAtivarInativarModule,
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
