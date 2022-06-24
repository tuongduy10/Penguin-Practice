import { Languages } from 'src/app/core/constant/languanges';
import { Router } from '@angular/router';
import { LoginRequest } from '../../dtos/login.request';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginLoading = false;
  passwordVisible: boolean = false;
  step2Actived: boolean = false;
  selectedValue: string = this.cookieService.get('lang') as string || 'en';
  languages = Languages;

  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private cookieService: CookieService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitLogin(){
    if(!this.validateForm.valid){
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    this.isLoginLoading = true;
    const request:LoginRequest = {
      username: this.validateForm.controls["username"].value.trim(),
      password: this.validateForm.controls["password"].value.trim()
    };
    this.authService.login(request).subscribe((response: any) => {
      const access_token = response.data.access_token;
      this.cookieService.set('access_token', access_token);

      this.authService.getUserCountry().subscribe((response: any) => {
        if(response.data.length > 1){
          this.router.navigate(["/choose-country"]);
          return;
        }
        this.router.navigate(["/home"]);
      })
      this.isLoginLoading = false;
    });
  }

  changeLanguage(){
    const currentLang = this.selectedValue;
    this.translate.use(currentLang);
    this.cookieService.set('lang', currentLang);
  }
}
