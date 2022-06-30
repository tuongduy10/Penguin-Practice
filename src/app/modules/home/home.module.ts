import { TranslateModule } from '@ngx-translate/core';
import { HomeRoutes } from './home.routing';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HomeRoutes,
    TranslateModule
  ]
})
export class HomeModule { }
