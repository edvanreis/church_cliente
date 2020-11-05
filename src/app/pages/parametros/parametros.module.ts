import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisarParametrosComponent } from './pesquisar/pesquisar-parametros.component';
import { CadastrarParametrosComponent } from './cadastrar/cadastrar-parametros.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../../pipes/pipe.module';
import { MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { DialogConfirmParametrosModule } from '../dialog/dialog-confirm-parametros/dialog-confirm-parametros.module';


const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarParametrosComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar', component:  CadastrarParametrosComponent , data: { animation: 'buttons' }},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    PipeModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    DialogConfirmParametrosModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PesquisarParametrosComponent,
    CadastrarParametrosComponent]
})
export class ParametrosModule { }
