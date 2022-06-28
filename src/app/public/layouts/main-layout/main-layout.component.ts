import { NotificationPageRequest } from '../../../core/services/notification/dtos/notification.request';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { UserProfile } from './../../../modules/auth/dtos/responses/profile.response';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Languages } from 'src/app/core/constant/languanges';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { EnumNotification } from 'src/app/core/services/notification/enum/notification.enum';
import { NotificationModel } from 'src/app/core/services/notification/dtos/notification.model';

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
  unread = 0;
  profile!: UserProfile;
  constructor(
    private cookieService: CookieService,
    private translateService: TranslateService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  notifications: NotificationModel[] = [];
  notiPageRequest: NotificationPageRequest = {
    isLast: false,
    pageNumber: 1,
    pageSize: 10,
    userId: 0,
    status: EnumNotification.All,
  };
  ngOnInit(): void {
    this.authService.getProfile().subscribe((response: any) => {
      const profile: UserProfile = response.data;
      this.profile = profile;
      this.notiPageRequest.userId = profile.id
      this.getUnread(profile.id);
      this.getAllNotification();
    })
  }
  isAllActive = false;
  getAllNotification(){
    this.notiPageRequest.status = EnumNotification.All;
    this.notificationService.getNotification(this.notiPageRequest).subscribe((response: any) =>{
      this.notifications = response.data as NotificationModel[];
    });
    this.deActivateNotifiAction();
    this.isAllActive = true;
  }
  isReadActive = false;
  getReadNotification(){
    this.notiPageRequest.status = EnumNotification.Read
    this.notificationService.getNotification(this.notiPageRequest).subscribe((response: any) =>{
      this.notifications = response.data as NotificationModel[];
    });
    this.deActivateNotifiAction();
    this.isReadActive = true;
  }
  isUnreadActive = false;
  getUnreadNotification(){
    this.notiPageRequest.status = EnumNotification.Unread;
    this.notificationService.getNotification(this.notiPageRequest).subscribe((response: any) =>{
      this.notifications = response.data as NotificationModel[];
    });
    this.deActivateNotifiAction();
    this.isUnreadActive = true;
  }
  getUnread(id: number){
    this.notificationService.getUnread(id).subscribe((response: any) => {
      this.unread = response.data as number;
    });
  }
  deActivateNotifiAction(){
    this.isAllActive = false;
    this.isUnreadActive = false;
    this.isReadActive = false;
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
