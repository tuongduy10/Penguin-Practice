import { NotificationPageRequest } from './../requests/notification.request';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) { }

  getNotification(){
    return this.httpClient.post("/notification-service/notification/",{});
  }
  getUnread(userId: number){
    return this.httpClient.post("/notification-service/notification/read/unread", { userId: userId });
  }
}
