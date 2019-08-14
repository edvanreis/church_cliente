import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'registrar-ponto',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [
  //       {
  //     path: '',
  //     loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  // }]},
  { path: 'cdk-login', component: LoginComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
