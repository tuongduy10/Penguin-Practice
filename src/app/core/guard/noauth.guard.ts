import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate{
  constructor(private router: Router, private authService:AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.authService.isLoggedIn()){
      this.router.navigate(["/choose-country"]);
      return false;
    }
    return true;
  }
}
