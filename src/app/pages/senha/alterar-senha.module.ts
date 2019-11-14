import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlterarSenhaComponent } from './alterar-senha.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

const routes: Routes = [
  {path: 'alterar-senha', component: AlterarSenhaComponent},
  {path: 'id:/alterar-senha', component: AlterarSenhaComponent},
];
@NgModule({
  imports: [
      CommonModule,
      FlexLayoutModule,
      MatButtonModule,
      MatInputModule,
      MatToolbarModule,
      FormsModule,
      ReactiveFormsModule,
      TextMaskModule,
      RouterModule.forChild(routes)
  ],
  declarations: [   
      AlterarSenhaComponent,
  ],
  exports: [
      RouterModule
  ],
  providers: [
  ]
})
export class AlterarSenhaModule { }
