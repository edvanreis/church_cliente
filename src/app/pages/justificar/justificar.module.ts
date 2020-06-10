import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisarJustificarAusenciaComponent } from './pesquisar/pesquisar-justificar-ausencia.component';
import { Routes, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatToolbarModule, MatDatepickerModule, MatSelectModule, MatOptionModule, MatAutocompleteModule, MatTableModule, MatPaginatorModule, MatDividerModule } from '@angular/material';
import { CadastrarJustificarAusenciaComponent } from './cadastrar/cadastrar-justificar-ausencia.component';
import { PipeModule } from '../../pipes/pipe.module';

const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarJustificarAusenciaComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar', component:  CadastrarJustificarAusenciaComponent , data: { animation: 'buttons' }}
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
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    PipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PesquisarJustificarAusenciaComponent,
    CadastrarJustificarAusenciaComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class JustificarModule { }
