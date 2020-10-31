import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AlterarSenhaComponent } from './pages/senha/alterar-senha.component';
import { CadastrarPedidoComponent } from './pages/pedido/cadastrar/cadastrar-pedido.component';





const routes: Routes = [
  { path: 'cdk-login', component: LoginComponent},
  { path: 'senha', component: AlterarSenhaComponent},
  { path: 'pedido', component: CadastrarPedidoComponent},
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
