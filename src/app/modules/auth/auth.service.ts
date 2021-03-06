import { Router } from '@angular/router';
import { LoginRequest } from './dtos/requests/login.request';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdateProfileRequest } from './dtos/requests/update.request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  getToken(): string{
    return this.cookieService.get("access_token");
  }
  login(request: LoginRequest){
    return this.httpClient.post("/user-service/login", request);
  }
  isLoggedIn(): boolean{
    const token = this.cookieService.get("access_token");
    if(token){
      return true;
    }
    return false;
  }
  logout(){
    this.httpClient.post("/user-service/logout", {});
    this.cookieService.delete("access_token");
    this.router.navigate(["/auth/login"]);
  }
  getUserCountry(){
    return this.httpClient.post("/user-service/oauth/country/gets", {});
  }
  getProfile(){
    return this.httpClient.post("/user-service/oauth/profile/gets", {});
  }
  getInfos(){
    return this.httpClient.post("/user-service/oauth/info", {});
  }
  updateProfile(request: UpdateProfileRequest){
    return this.httpClient.post("/user-service/oauth/profile/update", request);
  }
}
