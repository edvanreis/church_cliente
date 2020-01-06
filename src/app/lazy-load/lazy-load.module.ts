import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';


const routes: Routes = [
    { path: 'auth', loadChildren: '../auth/auth.module#AuthModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: 'login', loadChildren: '../pages/login/login.module#LoginModule' },
    { path: 'senha', loadChildren: '../pages/senha/alterar-senha.module#AlterarSenhaModule' },
    { path: 'visitante', loadChildren: '../pages/visitante/visitante.module#VisitanteModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: 'membro', loadChildren: '../pages/membro/membro.module#MembroModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: 'usuario', loadChildren: '../pages/usuario/usuario.module#UsuarioModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: 'perfil', loadChildren: '../pages/perfil/perfil.module#PerfilModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: 'permissoes', loadChildren: '../pages/permissoes/permissoes.module#PermissoesModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: 'igreja', loadChildren: '../pages/igreja/igreja.module#IgrejaModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: 'celula', loadChildren: '../pages/celula/celula.module#CelulaModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: 'rede', loadChildren: '../pages/rede/rede.module#RedeModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: '**', redirectTo: 'auth/dashboard', canActivate: [AuthGuardService] },
]
 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
