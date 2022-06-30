import { TranslateService } from '@ngx-translate/core';
import { UserInfo } from './../../../auth/dtos/responses/info.response';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private title:Title
  ) {
    this.title.setTitle(this.translateService.instant("MENU.HOME") + " «My Orders»");
  }

  ngOnInit(): void {
    this.authService.getInfos().subscribe((response: any) => {
      const info: UserInfo = response.data;
    })
  }

}
