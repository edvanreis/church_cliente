import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { ContatoComponent } from './contato/contato.component';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { PipeModule } from '../../pipe/pipe/pipe.module';
import { MembroService } from '../../service/membro.service';
import { EmitirEventoService } from '../../service/emitir-evento.service';

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
    PipeModule
  ],
  exports: [
    DadosPessoaisComponent,
    EnderecoComponent,
    ContatoComponent,
    EscolaridadeComponent
],
  declarations: [
    DadosPessoaisComponent,
    EnderecoComponent,
    ContatoComponent,
    EscolaridadeComponent
  ],
  providers: [
    MembroService,
    EmitirEventoService
  ]
})
export class PessoaModule { }
