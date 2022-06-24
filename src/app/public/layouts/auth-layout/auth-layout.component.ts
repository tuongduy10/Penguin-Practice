import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  backgroundUrl: string = "/assets/images/login-bg.jpg";
  logoUrl: string = "/assets/images/splashscreen.png";
  constructor() { }

  ngOnInit(): void {
  }

}
