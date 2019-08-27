import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../service/auth-guard.service';
 

const routes: Routes = [   
    {path: 'auth', loadChildren: '../auth/auth.module#AuthModule',canActivate: [AuthGuardService]},
    // {path: 'register', loadChildren: '../register/register.module#RegisterModule'},
    {path: 'login', loadChildren: '../pages/login/login.module#LoginModule'},
    {path: 'membro', loadChildren: '../membro/membro.module#MembroModule',data: { role: 'acessoBancoDeHoras' }, canActivate: [AuthGuardService]},
    // {path: 'editor', loadChildren: '../editor/editor.module#EditorModule'},

    {path: '**', redirectTo: 'auth/dashboard' ,canActivate: [AuthGuardService]},
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LazyLoadModule { }
