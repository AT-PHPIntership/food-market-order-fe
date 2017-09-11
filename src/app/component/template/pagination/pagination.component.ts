import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, PRIMARY_OUTLET} from '@angular/router';
import { PaginationService } from '../../../service/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pagination: PaginationService;
  id: number;
  urlBase: string;
  constructor(private paginationService: PaginationService,
              private route: ActivatedRoute) {
    this.pagination = this.paginationService;
  }
  ngOnInit() {
    const root = this.route.root;
    this.urlBase = this.getUrl(root);
  }
  private getUrl(route: ActivatedRoute, url: string = '') {
    // get the child routes
    let children;
    children = route.children;
    // return if there are no more children
    if (children.length === 0) {
      return url;
    }
    // iterate over each children
    let child;
    for (child of children) {
      // verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
      // get the route's URL segment
      let routeURL;
      routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      // append route URL to URL
      url += `/${routeURL}`;
      // recursive
      return this.getUrl(child, url);
    }
  }
}
