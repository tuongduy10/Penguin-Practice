import { NoAuthGuard } from './core/guard/noauth.guard';
import { MainLayoutComponent } from './public/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './public/layouts/auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  // Default route
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'choose-country',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard], // check access_token
    loadChildren: () =>
      import('./modules/choose-country/choose-country.module').then(m => m.ChooseCountryModule)
  },
  {
    path: ':country/home',
    component: MainLayoutComponent,
    canActivate: [AuthGuard], // check access_token
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard, NoAuthGuard]
})
export class AppRoutingModule { }
