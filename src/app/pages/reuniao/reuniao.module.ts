import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PesquisarReuniaoComponent } from './pesquisar/pesquisar-reuniao.component';
import { CadastrarReuniaoComponent } from './cadastrar/cadastrar-reuniao.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatDatepickerModule, MatSelectModule, MatOptionModule, MatAutocompleteModule, MatTableModule, MatPaginatorModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';
import { LicaoComponenteModule } from '../componentes/licao/licao-componente.module';
import { CelulaComponentModule } from '../componentes/celula/celula-component.module';
import { PipeModule } from '../../pipe/pipe/pipe.module';
import { TextMaskModule } from 'angular2-text-mask';

const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarReuniaoComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar', component:  CadastrarReuniaoComponent , data: { animation: 'buttons' }},
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
    MatTableModule,
    MatPaginatorModule,
    LicaoComponenteModule,
    CelulaComponentModule,
    PipeModule,
    TextMaskModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PesquisarReuniaoComponent,
    CadastrarReuniaoComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class ReuniaoModule { }
