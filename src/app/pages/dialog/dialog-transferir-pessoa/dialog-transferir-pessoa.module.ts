import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogTransferirPessoaComponent } from './dialog-transferir-pessoa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatAutocompleteModule, MatOptionModule } from '@angular/material';
import { IgrejasComponentModule } from '../../componentes/igrejas/igreja-compenent.module';
import { RedesComponenteModule } from '../../componentes/redes/redes-componente.module';
import { CelulaComponentModule } from '../../componentes/celula/celula-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    IgrejasComponentModule,
    RedesComponenteModule,
    CelulaComponentModule,
    MatAutocompleteModule,
    MatOptionModule
  ],
  declarations: [
    DialogTransferirPessoaComponent
  ],
  entryComponents:[
    DialogTransferirPessoaComponent
  ]
})
export class DialogTransferirPessoaModule { }
