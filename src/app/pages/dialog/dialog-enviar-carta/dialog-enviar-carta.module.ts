import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogEnviarCartaComponent } from './dialog-enviar-carta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { PesquisarMembroComponent } from '../../membro/pesquisar/pesquisar/pesquisar-membro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [
    DialogEnviarCartaComponent
  ],
  entryComponents: [DialogEnviarCartaComponent,PesquisarMembroComponent]  
})
export class DialogEnviarCartaModule { }
