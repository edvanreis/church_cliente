import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRemoverComponent } from './dialog-remover.component';
import { PermissoesService } from '../../../service/permissoes.service';
import { PesquisarPermissoesComponent } from '../../permissoes/pesquisar/pesquisar-permissoes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule } from '@angular/material';

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
    DialogRemoverComponent
  ],
  providers: [
    PermissoesService
],
entryComponents: [DialogRemoverComponent,PesquisarPermissoesComponent]
})
export class DialogRemoverModule { }
