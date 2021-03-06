import { FontSizeOptions } from './../../../core/constant/fontsizes';
import { NotificationPageRequest } from '../../../core/services/notification/dtos/notification.request';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { UserProfile } from './../../../modules/auth/dtos/responses/profile.response';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Languages } from 'src/app/core/constant/languanges';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { EnumNotification } from 'src/app/core/services/notification/enum/notification.enum';
import { NotificationModel } from 'src/app/core/services/notification/dtos/notification.model';
import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { NzMessageService } from 'ng-zorro-antd/message';
import { concat } from 'lodash';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  isSidebarCollapsed = false;
  isHeaderCollapsed = false;
  languages = Languages;
  fontSizeOptions = FontSizeOptions;
  selectedLang!:string;
  selectedFontSize!:string;
  unread = 0;
  profile!: UserProfile;
  totalPages!: number;
  totalElements!: number;
  pageNumber: number = 1;
  constructor(
    private cookieService: CookieService,
    private translateService: TranslateService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private message: NzMessageService
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
      // profile
      const profile: UserProfile = response.data;
      this.profile = profile;
      // languages
      this.translateService.use(profile.language);
      this.selectedLang = profile.language;
      this.cookieService.set('lang', profile.language);
      // fontsize
      this.selectedFontSize = profile.fontSize ?? "0";
      document.body.classList.value = "global-fs-" + (profile.fontSize ?? "0");
      // notifications
      this.notiPageRequest.userId = profile.id;
      this.getUnread(profile.id);
      this.getAllNotification();
    })
  }
  isAllActive = false;
  getAllNotification(){
    this.notiPageRequest.status = EnumNotification.All;
    this.getNotification();
    this.deActivateNotifiAction();
    this.isAllActive = true;
  }
  isReadActive = false;
  getReadNotification(){
    this.notiPageRequest.status = EnumNotification.Read
    this.getNotification();
    this.deActivateNotifiAction();
    this.isReadActive = true;
  }
  isUnreadActive = false;
  getUnreadNotification(){
    this.notiPageRequest.status = EnumNotification.Unread;
    this.getNotification();
    this.deActivateNotifiAction();
    this.isUnreadActive = true;
  }
  getNotification(){
    this.notificationService.getNotification(this.notiPageRequest).subscribe((response: any) =>{
      if(response.data){
        this.notifications = response.data as NotificationModel[];
        this.notificationService.setNotification(response);
      }
      // meta response
      if(response.meta){
        this.totalPages = response.meta.totalPages;
        this.totalElements = response.meta.totalElements;
        this.pageNumber = response.meta.pageNumber;
      }
      this.isRefreshLoading = false;
    });
  }
  getNewNotification(currentData: NotificationModel[]){
    this.notificationService.getNotification(this.notiPageRequest).subscribe((response: any) =>{
      if(response.data){
        this.notifications = concat(currentData, response.data);
      }
      // meta response
      if(response.meta){
        this.totalPages = response.meta.totalPages;
        this.totalElements = response.meta.totalElements;
        this.pageNumber = response.meta.pageNumber;
      }
    });
  }
  getUnread(id: number){
    this.notificationService.getUnread(id).subscribe((response: any) => {
      this.unread = response.data as number;
      this.notificationService.setNotification(response);
    });
  }
  deActivateNotifiAction(){
    this.notiPageRequest.pageNumber = 1;
    this.isAllActive = false;
    this.isUnreadActive = false;
    this.isReadActive = false;
  }
  changeLanguage(){
    const currentLang = this.selectedLang;
    const request = { ...this.profile, language: currentLang }
    this.authService.updateProfile(request).subscribe((response: any) => {
      this.translateService.use(currentLang);
      this.cookieService.set('lang', currentLang);
      this.message.create('success', this.translateService.instant('STATUS.SUCCESS'));
    });
  }
  changeFontSize(){
    const currentFontSize = this.selectedFontSize;
    document.body.classList.value = "global-fs-" + currentFontSize;
    const request = { ...this.profile, fontSize: currentFontSize }
    this.authService.updateProfile(request).subscribe((response: any) => {
      this.message.create('success', this.translateService.instant('STATUS.SUCCESS'));
    });
  }
  logout(){
    this.authService.logout();
  }
  scrolledIndexChange(){
    if(this.pageNumber == this.totalPages){
      return;
    }
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if(end === total){
      this.getNotificationByScrolled();
      return;
    }
  }
  getNotificationByScrolled(){
    if(this.isAllActive){
      this.notiPageRequest.status = EnumNotification.All;
    }
    if(this.isReadActive){
      this.notiPageRequest.status = EnumNotification.Read;
    }
    if(this.isUnreadActive){
      this.notiPageRequest.status = EnumNotification.Unread;
    }

    this.pageNumber = this.pageNumber + 1;
    this.notiPageRequest.pageNumber = this.pageNumber;
    this.getNewNotification(this.notifications);
  }
  trackByIdx(i: number){
    return i;
  }
  markAllAsRead(){
    this.notificationService.markAllAsRead(this.notiPageRequest).subscribe((response: any) => {
      if(response.data){
        this.notifications = response.data as NotificationModel[];
        this.notificationService.setNotification(response);
      }
      // meta response
      if(response.meta){
        this.totalPages = response.meta.totalPages;
        this.totalElements = response.meta.totalElements;
        this.pageNumber = response.meta.pageNumber;
      }
    });
  }
  isRefreshLoading = false;
  refreshNotification(){
    this.isRefreshLoading = true;
    this.notiPageRequest.pageNumber = 1;
    this.notiPageRequest.status = EnumNotification.All;
    this.getNotification();
  }
}
