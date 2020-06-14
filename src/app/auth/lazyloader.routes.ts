import { Routes } from '@angular/router';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';
import { AuthComponent } from './auth.component';
import { AuthGuardService } from '../service/auth-guard.service';

export const appRoutes: Routes = [{
        path: '', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardCrmComponent },
        // { path: 'senha', loadChildren: '../pages/senha/alterar-senha.module#AlterarSenhaModule' },
        { path: 'visitante', loadChildren: '../pages/visitante/visitante.module#VisitanteModule', canActivate: [AuthGuardService]},
        { path: 'membro', loadChildren: '../pages/membro/membro.module#MembroModule', canActivate: [AuthGuardService]},
        { path: 'usuario', loadChildren: '../pages/usuario/usuario.module#UsuarioModule', canActivate: [AuthGuardService] },
        { path: 'perfil', loadChildren: '../pages/perfil/perfil.module#PerfilModule',  canActivate: [AuthGuardService]},
        { path: 'permissoes', loadChildren: '../pages/permissoes/permissoes.module#PermissoesModule',  canActivate: [AuthGuardService]},
        { path: 'igreja', loadChildren: '../pages/igreja/igreja.module#IgrejaModule', canActivate: [AuthGuardService]},
        { path: 'celula', loadChildren: '../pages/celula/celula.module#CelulaModule',  canActivate: [AuthGuardService]},
        { path: 'rede', loadChildren: '../pages/rede/rede.module#RedeModule',  canActivate: [AuthGuardService]},
        { path: 'agendamentos', loadChildren: '../pages/agendamentos/agendamentos.module#AgendamentosModule', canActivate: [AuthGuardService]},
        { path: 'licao', loadChildren: '../pages/licao/licao.module#LicaoModule',  canActivate: [AuthGuardService]},
        { path: 'reuniao', loadChildren: '../pages/reuniao/reuniao.module#ReuniaoModule',  canActivate: [AuthGuardService]},
        { path: 'justificar', loadChildren: '../pages/justificar/justificar.module#JustificarModule',  canActivate: [AuthGuardService]},
        { path: 'relatorios', loadChildren: '../pages/relatorios/relatorios.module#RelatoriosModule',  canActivate: [AuthGuardService]},
        { path: 'grupo', loadChildren: '../pages/grupo/grupo.module#GrupoModule',  canActivate: [AuthGuardService]},
    ]
}];
