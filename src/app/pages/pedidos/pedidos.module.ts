import { DashboardWidgetModule } from './../../dashboard-widget/dashboard-widget.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatDatepickerModule, MatExpansionModule, MatInputModule, MatOptionModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { IgrejasComponenteModule } from '../componentes/igrejas/igreja-compenente.module';
import { PipeModule } from './../../pipes/pipe.module';
import { PesquisarPedidoComponent } from './pesquisar/pesquisar-pedido.component';



const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarPedidoComponent , data: { animation: 'buttons' }}
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
    IgrejasComponenteModule,
    MatButtonModule,
    DashboardWidgetModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PesquisarPedidoComponent
  ]
})
export class PedidosModule { }
