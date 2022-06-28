import { NotificationPageRequest } from './dtos/notification.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications$ = new BehaviorSubject<any>(null);

  constructor(private httpClient: HttpClient) { }

  setNotification(response: any){
    this.notifications$.next(response);
  }
  getNotification(request: NotificationPageRequest){
    return this.httpClient.post("/tw/notification-service/notification/", request);
  }
  getUnread(userId: number){
    return this.httpClient.post("/tw/notification-service/notification/read/unread", { userId: userId });
  }
  markAllAsRead(request: NotificationPageRequest){
    return this.httpClient.post("/tw/notification-service/notification/read/mark-all-as-read", request);
  }
}
