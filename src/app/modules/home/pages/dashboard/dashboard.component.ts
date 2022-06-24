import { UserInfo } from './../../../auth/dtos/responses/info.response';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getInfos().subscribe((response: any) => {
      const info: UserInfo = response.data;
      console.log(info);
    })
  }

}
