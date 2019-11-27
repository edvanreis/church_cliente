import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { PipeModule } from '../../pipe/pipe/pipe.module';
import { EmitirEventoService } from '../../service/emitir-evento.service';
import { InterceptorService } from '../../service/interceptor.service';
import { MembroService } from '../../service/membro.service';
import { PessoaModule } from '../pessoa/pessoa.module';
import { CadastrarMembroComponent } from './cadastrar/cadastrar-membro.component';
import { PesquisarMembroComponent } from './pesquisar/pesquisar-membro/pesquisar-membro.component';
import { ExcelService } from '../../service/excel.service';
import { EtapaVisaoService } from '../../service/etapa-visao.service';
import { EnderecoModule } from '../endereco/endereco.module';




const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarMembroComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarMembroComponent , data: { animation: 'buttons' }}
];
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    TextMaskModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    HttpClientModule,
    PessoaModule,
    PipeModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EnderecoModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
],
  declarations: [
    CadastrarMembroComponent,
    PesquisarMembroComponent
  ],
  providers: [
    MembroService,
    EmitirEventoService,
    ExcelService,
    EtapaVisaoService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class MembroModule { }
