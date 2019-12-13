import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { ContatosModule } from './pages/contatos/contatos.module';
import { LoginModule } from './pages/login/login.module';
import { MembroModule } from './pages/membro/membro.module';
import { PerfilModule } from './pages/perfil/perfil.module';
import { PermissoesModule } from './pages/permissoes/permissoes.module';
import { AlterarSenhaModule } from './pages/senha/alterar-senha.module';
import { InterceptorService } from './service/interceptor.service';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LazyLoadModule,
    CoreModule,
    BrowserAnimationsModule,
    MembroModule,
    NotifierModule ,
    AppRoutingModule,
    LoginModule,
    PermissoesModule,
    MatDialogModule,
    PerfilModule,
    AlterarSenhaModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
