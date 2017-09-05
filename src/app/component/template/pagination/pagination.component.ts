import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../../service/pagination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pagination: PaginationService;
  id: number;
  private sub: any;
  constructor(private paginationService: PaginationService,
              private route: ActivatedRoute) {
    this.pagination = this.paginationService;
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
  }

}
