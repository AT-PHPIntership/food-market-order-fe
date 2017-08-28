import {Component, OnInit, ViewChild} from '@angular/core';
import {ShareService} from './service/share.service';
import {HeaderComponent} from './component/template/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShareService]
})
export class AppComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  title = 'app';
 constructor(private service: ShareService) {
 }
 ngOnInit() {
    this.service.login.subscribe(data => {
      this.header.currentUser = data;
    });
 }
}
