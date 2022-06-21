import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'penguin-practice';
  constructor(public translateService: TranslateService){
    let lang = localStorage.getItem('lang') ?? 'en';
    translateService.addLangs(['en','jp', 'zh-cn', 'zh-tw']);
    translateService.setDefaultLang(lang);
    localStorage.setItem('lang', lang);
  }
}
