import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';
import { MembroService } from '../service/membro.service';
import { CadastroMembroComponent } from './cadastro/cadastro-membro.component';
import { KeyValuePipe } from '../pipes/key-value.pipe';

// const customNotifierOptions: NotifierOptions = {
//   position: {
// 		horizontal: {
// 			position: 'left',
// 			distance: 12
// 		},
// 		vertical: {
// 			position: 'bottom',
// 			distance: 12,
// 			gap: 10
// 		}
// 	},
//   theme: 'material',
//   behaviour: {
//     autoHide: 5000,
//     onClick: 'hide',
//     onMouseover: 'pauseAutoHide',
//     showDismissButton: true,
//     stacking: 4
//   },
//   animations: {
//     enabled: true,
//     show: {
//       preset: 'slide',
//       speed: 300,
//       easing: 'ease'
//     },
//     hide: {
//       preset: 'fade',
//       speed: 300,
//       easing: 'ease',
//       offset: 50
//     },
//     shift: {
//       speed: 300,
//       easing: 'ease'
//     },
//     overlap: 150
//   }
// };

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
    MatCheckboxModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
    KeyValuePipe
],
  declarations: [
    CadastroMembroComponent,
    KeyValuePipe
  ],
  providers: [
    MembroService
  ]
})
export class MembroModule { }
