import { ParametrosModule } from './pages/parametros/parametros.module';
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
import { JustificarModule } from './pages/justificar/justificar.module';
import { LicaoModule } from './pages/licao/licao.module';
import { LoginModule } from './pages/login/login.module';
import { MembroModule } from './pages/membro/membro.module';
import { PerfilModule } from './pages/perfil/perfil.module';
import { PermissoesModule } from './pages/permissoes/permissoes.module';
import { ReuniaoModule } from './pages/reuniao/reuniao.module';
import { AlterarSenhaModule } from './pages/senha/alterar-senha.module';
import { InterceptorService } from './service/interceptor.service';
import { RelatoriosModule } from './pages/relatorios/relatorios.module';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { PedidoModule } from './pages/pedido/pedido.module';
import { PedidosModule } from './pages/pedidos/pedidos.module';
import { AgendamentoModule } from './pages/agendamento/agendamento.module';





export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: "."
};








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
    AlterarSenhaModule,
    LicaoModule,
    ReuniaoModule,
    JustificarModule,
    RelatoriosModule,
    CurrencyMaskModule,
    PedidoModule,
    PedidosModule,
    AgendamentoModule,
    ParametrosModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
