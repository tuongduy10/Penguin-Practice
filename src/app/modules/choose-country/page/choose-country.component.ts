import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Countries } from '../../../core/constant/countries';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-choose-country',
  templateUrl: './choose-country.component.html',
  styleUrls: ['./choose-country.component.scss']
})
export class ChooseCountryComponent implements OnInit {
  currentLang = this.cookieService.get("lang");
  constructor(
    private router: Router,
    private authService: AuthService,
    private translateService: TranslateService,
    private cookieService: CookieService
  ) { }


  countries: string[] = [];
  ngOnInit() {
    this.translateService.use(this.currentLang);
    this.authService.getUserCountry().subscribe((response: any) => {
      this.countries = response.data;
    });
  }
  chooseCountry(country: string){
    this.router.navigate([`${country}/home`]);
  }
  getCountryName(key: string): string | undefined{
    return Countries.find(item => item.key == key)?.value;
  }
  logout(){
    this.authService.logout();
  }
}
