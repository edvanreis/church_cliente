import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SenhaComponent } from './senha.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {path: 'senha', component: SenhaComponent},
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
      SenhaComponent,
  ],
  exports: [
      RouterModule
  ],
  providers: [
  ]
})
export class SenhaModule { }
