import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../../service/api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home-material',
  templateUrl: './home-material.component.html',
  styleUrls: ['./home-material.component.css']
})
export class HomeMaterialComponent implements OnInit {

  sub: any;
  data: any;
  constructor(private route: ActivatedRoute,
              private apiService: APIService) {
    this.data = [];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let url;
      url = `${environment.hostname}/api/materials?OrderBy=created_at:desc`;
      this.apiService.apiGet(url).subscribe(data => {
        data.data.forEach(item => {
          let material;
          material = Object.assign({}, item);
          material.type = 'App\\Material';
          this.data.push(material);
        });
      });
    });
  }
}
