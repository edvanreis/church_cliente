import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LazyLoadModule } from './lazy-load/lazy-load.module';
import { LoginModule } from './pages/login/login.module';
import { MembroModule } from './pages/membro/membro.module';
import { PermissoesModule } from './pages/permissoes/permissoes.module';
import { InterceptorService } from './service/interceptor.service';
import { PerfilModule } from './pages/perfil/perfil.module';
import { AlterarSenhaModule } from './pages/senha/alterar-senha.module';
import { DatePipe } from '@angular/common';












/**
 * Custom angular notifier options
//  */
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
    NotifierModule ,//.withConfig(customNotifierOptions),
    AppRoutingModule,
    LoginModule,
    PermissoesModule,
    MatDialogModule,
    PerfilModule,
    AlterarSenhaModule
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
