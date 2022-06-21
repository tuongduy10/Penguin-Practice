import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  backgroundUrl: string = "/assets/images/login-bg.jpg";
  logoUrl: string = "/assets/images/splashscreen.png";
  passwordVisible: boolean = true;
  step2Actived: boolean = false;
  selectedValue: string = localStorage.getItem('lang') as string || 'en';
  languages: any[] = [
    {
      value: "en",
      label: "English"
    },
    {
      value: "jp",
      label: "Japanese"
    },
    {
      value: "zh-cn",
      label: "Traditional Chinese"
    },
    {
      value: "zh-tw",
      label: "Simplified Chinese"
    }
  ];

  validateForm!: FormGroup;
  constructor(private fb: FormBuilder, private translate: TranslateService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitLogin(){

  }

  changeLanguage(){
    const currentLang = this.selectedValue;
    this.translate.use(currentLang);
    localStorage.setItem('lang', currentLang);
  }
}
