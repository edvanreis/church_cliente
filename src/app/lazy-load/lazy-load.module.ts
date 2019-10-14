import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';


const routes: Routes = [
    { path: 'auth', loadChildren: '../auth/auth.module#AuthModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: 'login', loadChildren: '../pages/login/login.module#LoginModule' },
    { path: 'membro', loadChildren: '../pages/membro/membro.module#MembroModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: 'permissoes', loadChildren: '../pages/permissoes/permissoes.module#PermissoesModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    { path: '**', redirectTo: 'auth/dashboard', canActivate: [AuthGuardService] },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
