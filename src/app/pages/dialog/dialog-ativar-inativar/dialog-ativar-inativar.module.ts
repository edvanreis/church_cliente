import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatSelectModule, MatToolbarModule, MatOptionModule } from '@angular/material';
import { PesquisarCelulaComponent } from '../../celula/pesquisar/pesquisar-celula.component';
import { DialogAtivarInativarComponent } from './dialog-ativar-inativar.component';
import { PesquisarMembroComponent } from '../../membro/pesquisar/pesquisar/pesquisar-membro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
  ],
  declarations: [
    DialogAtivarInativarComponent
  ],
  entryComponents: [DialogAtivarInativarComponent]  
})
export class DialogAtivarInativarModule { }
