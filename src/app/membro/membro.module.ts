import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule, MatExpansionModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { MembroService } from '../service/membro.service';
import { CadastrarMembroComponent } from './cadastrar/cadastrar-membro.component';
import { KeyValuePipe } from '../pipes/key-value.pipe';
import { PesquisarMembroComponent } from './pesquisar/pesquisar-membro/pesquisar-membro.component';


const routes: Routes = [
  { path: 'cadastrar', component:  CadastrarMembroComponent , data: { animation: 'buttons' }},
  { path: 'pesquisar', component:  PesquisarMembroComponent , data: { animation: 'buttons' }}
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
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    KeyValuePipe
],
  declarations: [
    CadastrarMembroComponent,
    KeyValuePipe,
    PesquisarMembroComponent
  ],
  providers: [
    MembroService
  ]
})
export class MembroModule { }
