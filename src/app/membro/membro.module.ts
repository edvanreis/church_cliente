import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroMembroComponent } from './cadastro/cadastro-membro.component';
import { MatToolbarModule, MatCardModule, MatInputModule, MatFormFieldModule, MatDividerModule, MatIconModule, MatButtonModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembroService } from '../service/membro.service';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: 'cadastro', component:  CadastroMembroComponent , data: { animation: 'buttons' }}
];
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    TextMaskModule,
    HttpClientModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
],
  declarations: [
    CadastroMembroComponent,
  ],
  providers: [
    MembroService
  ]
})
export class MembroModule { }
