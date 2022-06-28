import { NotificationPageRequest } from './dtos/notification.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  getNotification(request: NotificationPageRequest){
    return this.httpClient.post("/tw/notification-service/notification/", request);
  }
  getUnread(userId: number){
    return this.httpClient.post("/tw/notification-service/notification/read/unread", { userId: userId });
  }
}
