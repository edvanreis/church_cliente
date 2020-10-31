import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { DialogRemoverPerfilComponent } from './dialog-remover-perfil.component';
import { PerfilService } from '../../../service/perfil.service';
import { PesquisarPerfilComponent } from '../../perfil/pesquisar/pesquisar-perfil.component';

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
    DialogRemoverPerfilComponent
  ],
  providers: [
    PerfilService
],
entryComponents: [DialogRemoverPerfilComponent,PesquisarPerfilComponent]  
})
export class DialogRemoverPerfilModule { }
