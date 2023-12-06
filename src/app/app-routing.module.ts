import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Guards/auth-guard';
import { UsuarioComponent } from './Cadastros/usuario/usuario.component';
import { RolesComponent } from './Cadastros/Roles/roles/roles.component';
import { CadastroRolesComponent } from './Cadastros/Roles/cadastro-roles/cadastro-roles.component';
import { ListaUsuarioComponent } from './Cadastros/usuario/lista-usuario/lista-usuario.component';





const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'login'},
  {path:'login', component: LoginComponent},
  {path:'usuario', component: UsuarioComponent},
  {path:'ListRoles', component: RolesComponent},
  {path:'ListUser', component: ListaUsuarioComponent},
  {path:'cadastro', component: CadastroRolesComponent},   
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
