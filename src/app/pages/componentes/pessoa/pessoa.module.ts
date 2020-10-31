import { MembroService } from './../../../service/membro.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule, MatSlideToggleModule, MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import { TextMaskModule } from 'angular2-text-mask';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { EscolaridadeComponent } from '../escolaridade/escolaridade.component';
import { EmitirEventoService } from '../../../service/emitir-evento.service';
import { IgrejasComponenteModule } from '../../componentes/igrejas/igreja-compenente.module';
import { CelulaComponentModule } from '../../componentes/celula/celula-component.module';
import { PipeModule } from '../../../pipes/pipe.module';


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
    MatDatepickerModule,
    MatNativeDateModule,
    TextMaskModule,
    MatSlideToggleModule,
    IgrejasComponenteModule,
    CelulaComponentModule,
    MatAutocompleteModule,
    PipeModule
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
