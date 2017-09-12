import { Component, OnInit, ViewChild } from '@angular/core';
import { ShareService } from './service/share.service';
import { HeaderComponent } from './component/template/header/header.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShareService]
})
export class AppComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  title = 'app';
  constructor(private service: ShareService, private translate: TranslateService) {
    translate.setDefaultLang('vi');
  }
  ngOnInit() {
    this.service.login.subscribe(data => {
      this.header.login(data);
    });
  }
}
