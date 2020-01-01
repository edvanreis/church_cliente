import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { InterceptorService } from '../../service/interceptor.service';
import { CadastrarIgrejaComponent } from './cadastrar/cadastrar-igreja.component';
import { IgrejaDadosComponent } from './igreja-dados/igreja-dados.component';
import { PesquisarIgrejaComponent } from './pesquisar/pesquisar-igreja.component';
import { EnderecoModule } from '../endereco/endereco.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ContatosModule } from '../contatos/contatos.module';
import { PipeModule } from '../../pipe/pipe/pipe.module';



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
    MatTabsModule,
    EnderecoModule,
    TextMaskModule,
    ContatosModule,
    MatButtonModule, 
    PipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarIgrejaComponent, 
    PesquisarIgrejaComponent, 
    IgrejaDadosComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class IgrejaModule { }
