import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import { TextMaskModule } from 'angular2-text-mask';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { EscolaridadeComponent } from '../escolaridade/escolaridade.component';
import { PipeModule } from '../../../pipe/pipe/pipe.module';
import { MembroService } from '../../../service/membro.service';
import { EmitirEventoService } from '../../../service/emitir-evento.service';

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
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    PipeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TextMaskModule
  ],
  exports: [
    DadosPessoaisComponent,
    EscolaridadeComponent
],
  declarations: [
    DadosPessoaisComponent,
    EscolaridadeComponent
  ],
  providers: [
    MembroService,
    EmitirEventoService,
    NgxViacepService
  ]
})
export class PessoaModule { }
