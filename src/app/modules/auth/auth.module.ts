import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutes } from './auth.routing';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutes,

    NzSelectModule,
    NzButtonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class AuthModule { }
