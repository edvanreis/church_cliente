import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatRadioModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { PipeModule } from '../../pipes/pipe.module';
import { InterceptorService } from '../../service/interceptor.service';
import { ContatosModule } from '../componentes/contatos/contatos.module';
import { EnderecoModule } from '../componentes/endereco/endereco.module';
import { IgrejaDadosModule } from '../componentes/igreja-dados/igreja-dados.module';
import { DialogAtivarInativarModule } from '../dialog/dialog-ativar-inativar/dialog-ativar-inativar.module';
import { CadastrarIgrejaComponent } from './cadastrar/cadastrar-igreja.component';
import { PesquisarIgrejaComponent } from './pesquisar/pesquisar-igreja.component';



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
    MatDividerModule,
    MatSlideToggleModule,
    DialogAtivarInativarModule,
    MatExpansionModule,
    IgrejaDadosModule,
    PipeModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatRadioModule,
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
