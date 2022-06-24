import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "src/app/modules/auth/auth.service";
import { API_BASE_URL } from "../constant/api-baseurl";

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService){}

  handleErrorResponse(response: HttpErrorResponse) {
    console.log("error---", response);
    switch(response.status){
      case 400:
        if (response.error){
          alert(response.error.message);
        }else{
          alert("Bad request!");
        }
        break;
      case 401:
        this.authService.logout()
        break;
      default:
        alert(response.error.message);
        break;
    }
  }
  intercept(request: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<any>> {
    let requestContent = request.clone({
      setHeaders: {
        Authorization: "Bearer " + this.authService.getToken(),
      },
      url: `${API_BASE_URL}${request.url}`,
      responseType: "json",
    });

    return next.handle(requestContent).pipe(catchError((response: HttpErrorResponse) => {
      this.handleErrorResponse(response)
      return throwError(() => response.error);
    }));
  }
}
