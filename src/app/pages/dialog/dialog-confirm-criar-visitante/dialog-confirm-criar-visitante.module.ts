import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmCriarVisitanteComponent } from './dialog-confirm-criar-visitante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatTableModule, MatSortModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  declarations: [
    DialogConfirmCriarVisitanteComponent
  ],
  entryComponents: [
    DialogConfirmCriarVisitanteComponent
  ]
})
export class DialogConfirmCriarVisitanteModule { }
