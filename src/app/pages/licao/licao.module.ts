import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../service/interceptor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule } from '@angular/material';
import { PesquisarLicaoComponent } from './pesquisar/pesquisar-licao.component';
import { DialogAddTitulosLicaoModule } from '../dialog/dialog-add-titulos-licao/dialog-add-titulos-licao.module';
import { LicaoService } from '../../service/licao.service';
import { DialogConfirmLicaoModule } from '../dialog/dialog-confirm-licao/dialog-confirm-licao.module';


const routes: Routes = [
  { path: 'pesquisar', component:  PesquisarLicaoComponent , data: { animation: 'buttons' }},
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    DialogAddTitulosLicaoModule,
    DialogConfirmLicaoModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PesquisarLicaoComponent
  ],
  providers: [
    LicaoService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ]
})
export class LicaoModule { }
