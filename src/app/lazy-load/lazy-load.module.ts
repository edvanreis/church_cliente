import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';


const routes: Routes = [
    { path: 'auth', loadChildren: '../auth/auth.module#AuthModule',  canActivate: [AuthGuardService] },
    { path: 'login', loadChildren: '../pages/login/login.module#LoginModule' },
    { path: 'senha', loadChildren: '../pages/senha/alterar-senha.module#AlterarSenhaModule' },
    { path: 'visitante', loadChildren: '../pages/visitante/visitante.module#VisitanteModule', canActivate: [AuthGuardService] },
    { path: 'membro', loadChildren: '../pages/membro/membro.module#MembroModule', canActivate: [AuthGuardService] },
    { path: 'usuario', loadChildren: '../pages/usuario/usuario.module#UsuarioModule', canActivate: [AuthGuardService] },
    { path: 'perfil', loadChildren: '../pages/perfil/perfil.module#PerfilModule', canActivate: [AuthGuardService] },
    { path: 'permissoes', loadChildren: '../pages/permissoes/permissoes.module#PermissoesModule',  canActivate: [AuthGuardService] },
    { path: 'igreja', loadChildren: '../pages/igreja/igreja.module#IgrejaModule',  canActivate: [AuthGuardService] },
    { path: 'celula', loadChildren: '../pages/celula/celula.module#CelulaModule',  canActivate: [AuthGuardService] },
    { path: 'rede', loadChildren: '../pages/rede/rede.module#RedeModule',  canActivate: [AuthGuardService] },
    { path: 'agendamentos', loadChildren: '../pages/agendamentos/agendamentos.module#AgendamentosModule', canActivate: [AuthGuardService] },
    { path: 'licao', loadChildren: '../pages/licao/licao.module#LicaoModule', canActivate: [AuthGuardService] },
    { path: 'reuniao', loadChildren: '../pages/reuniao/reuniao.module#ReuniaoModule', canActivate: [AuthGuardService] },
    { path: '**', redirectTo: 'auth/dashboard', canActivate: [AuthGuardService] },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
