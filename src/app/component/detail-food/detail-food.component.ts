import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../service/api.service';
import { environment } from '../../../environments/environment';
import { PrimaryBlockComponent } from './primary-block/primary-block.component';

@Component({
  selector: 'app-detail-food',
  templateUrl: './detail-food.component.html',
  styleUrls: ['./detail-food.component.css']
})
export class DetailFoodComponent implements OnInit, OnDestroy {

  id: number;
  sub: any;
  @ViewChild(PrimaryBlockComponent) block: PrimaryBlockComponent;
  constructor(private route: ActivatedRoute,
              private apiService: APIService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      let url;
      url = `${environment.hostname}/api/foods/${this.id}`;
      this.apiService.apiGet(url).subscribe(data => {
        this.block.item = data;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
