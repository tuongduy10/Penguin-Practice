import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { NotificationPageRequest } from './../../../core/requests/notification.request';
import { NotificationService } from './../../../core/services/notification.service';
import { UserProfile } from './../../../modules/auth/dtos/responses/profile.response';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Languages } from 'src/app/core/constant/languanges';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  isSidebarCollapsed = false;
  isHeaderCollapsed = false;
  languages = Languages;
  selectedLang = this.cookieService.get("lang");
  profile!: UserProfile;
  constructor(
    private cookieService: CookieService,
    private translateService: TranslateService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((response: any) => {
      const profile: UserProfile = response.data;
      this.profile = profile;
    })
  }
  changeLanguage(){
    const currentLang = this.selectedLang;
    this.translateService.use(currentLang);
    this.cookieService.set('lang', currentLang);
  }
  logout(){
    this.authService.logout();
  }
}
