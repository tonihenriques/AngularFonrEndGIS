import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Guards/auth-guard';


const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'login'},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
