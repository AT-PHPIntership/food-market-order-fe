import { Component, OnInit, ViewChild } from '@angular/core';
import { ShareService } from './service/share.service';
import { HeaderComponent } from './component/template/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { QuickviewComponent } from './component/category/quickview/quickview.component';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShareService]
})
export class AppComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;
  @ViewChild(QuickviewComponent) quickviewComponent: QuickviewComponent;
  title = 'app';
  constructor(private service: ShareService,
              private translate: TranslateService,
              private _router: Router,
              private titleService: Title,
              private activatedRoute: ActivatedRoute) {
    translate.setDefaultLang('vi');
  }
  ngOnInit() {
    this._router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
    this.service.login.subscribe(data => {
      this.header.login(data);
    });
    this.service.cart.subscribe(data => {
      this.header.addCart(data);
    });
    this.service.viewQuick.subscribe(data => {
      this.quickviewComponent.param = 'block';
      this.quickviewComponent.product = data;
    });
    this._router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        if (event.hasOwnProperty('title')) {
          this.titleService.setTitle(this.translate.instant(event['title']));
        }
      });
  }
  closeViewQuick(event) {
    this.quickviewComponent.param = event;
  }
}
