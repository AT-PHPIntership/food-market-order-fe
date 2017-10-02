import { Component, OnInit, ViewChild } from '@angular/core';
import { ShareService } from './service/share.service';
import { HeaderComponent } from './component/template/header/header.component';
import { TranslateService } from '@ngx-translate/core';
import { QuickviewComponent } from './component/category/quickview/quickview.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {FacebookService, InitParams} from "ngx-facebook";

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
              private activatedRoute: ActivatedRoute,
              private fb: FacebookService) {
    translate.setDefaultLang('vi');
    const initParams: InitParams = {
      appId      : '129604284344795',
      version    : 'v2.10'
    };
    fb.init(initParams);
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
          // this.translate.reloadLang('vi');
          this.translate.get(event['title']).subscribe((res: string) => {
            this.titleService.setTitle(res);
          });
          // this.titleService.setTitle(this.translate.instant(event['title']));
        }
      });
  }
  closeViewQuick(event) {
    this.quickviewComponent.param = event;
  }
}
