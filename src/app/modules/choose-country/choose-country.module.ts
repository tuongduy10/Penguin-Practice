import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseCountryComponent } from './page/choose-country.component';
import { ChooseCountryRoutes } from './choose-country.routing';
import { TranslateModule } from '@ngx-translate/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    CommonModule,
    ChooseCountryRoutes,
    TranslateModule,
    NzIconModule
  ],
  declarations: [ChooseCountryComponent]
})
export class ChooseCountryModule { }
