import { PipeModule } from './../../pipes/pipe.module';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatSelectModule, MatOptionModule, MatCardModule, MatDatepickerModule, MatAutocompleteModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';
import { CadastrarPedidoComponent } from './cadastrar/cadastrar-pedido.component';
import { PesquisarPedidoComponent } from './pesquisar/pesquisar-pedido.component';


const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarPedidoComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarPedidoComponent , data: { animation: 'buttons' }},
];

@NgModule({
  imports: [
    CommonModule,
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
    RouterModule.forChild(routes)
  ],
  declarations: [
    CadastrarPedidoComponent,
    PesquisarPedidoComponent
  ]
})
export class PedidoModule { }
