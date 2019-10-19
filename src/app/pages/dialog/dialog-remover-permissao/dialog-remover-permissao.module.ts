import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { PermissoesService } from '../../../service/permissoes.service';
import { PesquisarPermissoesComponent } from '../../permissoes/pesquisar/pesquisar-permissoes.component';
import { DialogRemoverPermissaoComponent } from './dialog-remover-permissao.component';

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
    DialogRemoverPermissaoComponent
  ],
  providers: [
    PermissoesService
],
entryComponents: [DialogRemoverPermissaoComponent,PesquisarPermissoesComponent]
})
export class DialogRemoverPermissaoModule { }
