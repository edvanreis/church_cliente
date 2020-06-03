import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatDatepickerModule, MatDividerModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { PipeModule } from '../../pipes/pipe.module';
import { InterceptorService } from '../../service/interceptor.service';
import { CelulaComponentModule } from '../componentes/celula/celula-component.module';
import { LicaoComponenteModule } from '../componentes/licao/licao-componente.module';
import { MembroComponenteModule } from '../componentes/membro/membro-componente.module';
import { DialogConfirmPessoaReuniaoModule } from '../dialog/dialog-confirm-pessoa-reuniao/dialog-confirm-pessoa-reuniao.module';
import { DialogConfirmReuniaoModule } from '../dialog/dialog-confirm-reuniao/dialog-confirm-reuniao.module';
import { CadastrarReuniaoComponent } from './cadastrar/cadastrar-reuniao.component';
import { PesquisarReuniaoComponent } from './pesquisar/pesquisar-reuniao.component';



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
    TextMaskModule,
    MembroComponenteModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    DialogConfirmReuniaoModule,
    PipeModule,
    DialogConfirmPessoaReuniaoModule,
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
