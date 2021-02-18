import { DialogConfirmResetSenhaModule } from './../dialog/dialog-confirm-reset-senha/dialog-confirm-reset-senha.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisarUsuarioComponent } from './pesquisar/pesquisar-usuario.component';
import { CadastrarUsuarioComponent } from './cadastrar/cadastrar-usuario.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatSelectModule, MatOption, MatOptionModule, MatAutocompleteModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';
import { TextMaskModule } from 'angular2-text-mask';


const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarUsuarioComponent , data: { animation: 'buttons' }},
  { path: 'cadastrar', component:  CadastrarUsuarioComponent , data: { animation: 'buttons' }},
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    TextMaskModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DialogConfirmResetSenhaModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
],
  declarations: [
    PesquisarUsuarioComponent,
    CadastrarUsuarioComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class UsuarioModule { }
