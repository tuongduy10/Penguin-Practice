import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'penguin-practice';
  constructor(
    public translateService: TranslateService,
    private cookieService: CookieService,
  ){
    const lang = this.cookieService.get('lang') || 'en';
    translateService.addLangs(['en','jp', 'zh-cn', 'zh-tw']);
    translateService.setDefaultLang(lang);
    this.cookieService.set('lang', lang);
  }
}
