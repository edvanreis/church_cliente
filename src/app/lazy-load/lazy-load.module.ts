import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';


const routes: Routes = [
    { path: 'auth', loadChildren: '../auth/auth.module#AuthModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    // {path: 'register', loadChildren: '../register/register.module#RegisterModule'},
    { path: 'login', loadChildren: '../pages/login/login.module#LoginModule' },
    { path: 'membro', loadChildren: '../pages/membro/membro.module#MembroModule', data: { role: 'master' }, canActivate: [AuthGuardService] },
    // {path: 'editor', loadChildren: '../editor/editor.module#EditorModule'},

    { path: '**', redirectTo: 'auth/dashboard', canActivate: [AuthGuardService] },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
