import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatExpansionModule, MatInputModule, MatOptionModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { PipeModule } from '../../pipes/pipe.module';
import { IgrejasComponentModule } from '../componentes/igrejas/igreja-compenent.module';
import { CadastrarPedidoComponent } from './cadastrar/cadastrar-pedido.component';



const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarPedidoComponent , data: { animation: 'buttons' }},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    TextMaskModule,
    MatSelectModule,
    MatOptionModule,
    PipeModule,
    MatCardModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatExpansionModule,
    IgrejasComponentModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarPedidoComponent,
  ]
})
export class PedidoModule { }
