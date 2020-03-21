import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { PesquisarIgrejaComponent } from '../../igreja/pesquisar/pesquisar-igreja.component';
import { DialogInativarIgrejaComponent } from './dialog-inativar-igreja.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [
    DialogInativarIgrejaComponent
  ],
  exports:[
    DialogInativarIgrejaComponent
  ],
  entryComponents: [DialogInativarIgrejaComponent,PesquisarIgrejaComponent]  
})
export class DialogInativarIgrejaModule { }
