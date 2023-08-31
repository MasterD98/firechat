import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import {canActivate,redirectUnauthorizedTo,redirectLoggedInTo} from '@angular/fire/auth-guard'

const redirectToLogin=()=> redirectUnauthorizedTo(['login']);
const redirectToHome=()=> redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:LandingComponent
  },
  {
    path:'login',
    component:LoginComponent,
    ...canActivate(redirectToHome)

  },
  {
    path:'sign-up',
    component:SignUpComponent,
    ...canActivate(redirectToHome)
  },
  {
    path:'home',
    component:HomeComponent,
    ...canActivate(redirectToLogin)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
