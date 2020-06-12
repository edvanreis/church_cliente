import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';
import { RelatorioComponent } from './gerar/relatorios.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatSelectModule, MatOptionModule, MatAutocompleteModule } from '@angular/material';

const routes: Routes = [
  { path: 'gerar', component:  RelatorioComponent , data: { animation: 'buttons' }},
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RelatorioComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class RelatoriosModule { }
