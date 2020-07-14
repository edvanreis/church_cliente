import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPessoaGrupoModalidadeMusicoComponent } from './dialog-pessoa-grupo-modalidade-musico.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatButtonModule, MatTableModule, MatSortModule, MatFormFieldModule, MatPaginatorModule, MatInputModule, MatTooltipModule, MatOptionModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule
  ],
  declarations: [
    DialogPessoaGrupoModalidadeMusicoComponent
  ],
  entryComponents:[
    DialogPessoaGrupoModalidadeMusicoComponent
  ]
})
export class DialogPessoaGrupoModalidadeMusicoModule { }
