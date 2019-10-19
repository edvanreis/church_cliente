import { Routes } from '@angular/router';
import { DashboardCrmComponent } from '../dashboard-crm/dashboard-crm.component';
import { AuthComponent } from './auth.component';
import { AuthGuardService } from '../service/auth-guard.service';

export const appRoutes: Routes = [{
        path: '', component: AuthComponent, children: [
        { path: 'dashboard', component: DashboardCrmComponent },
        { path: 'membro', loadChildren: '../pages/membro/membro.module#MembroModule',  data: { role: 'master' }, canActivate: [AuthGuardService]},
        { path: 'perfil', loadChildren: '../pages/perfil/perfil.module#PerfilModule',  data: { role: 'master' }, canActivate: [AuthGuardService]},
        { path: 'permissoes', loadChildren: '../pages/permissoes/permissoes.module#PermissoesModule',  data: { role: 'master' }, canActivate: [AuthGuardService]},
        
         
    ]
}];
