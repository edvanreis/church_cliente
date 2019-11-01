import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlterarSenhaComponent } from './alterar-senha.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'alterar-senha', component: AlterarSenhaComponent},
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
